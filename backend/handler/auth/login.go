package auth

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"log"
	"net"
	"net/http"
	"strings"
	"time"

	"backend/config"
	"backend/repository"

	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("super-secret-key"))

type Credentials struct {
	ID     string `json:"id"`
	Passwd string `json:"passwd"`
}

type LoginResponse struct {
	ID        string `json:"id"`
	EmpName   string `json:"emp_name"`
	DeptName  string `json:"dept_name"`
	OfficeTel string `json:"office_tel"`
	MobileTel string `json:"mobile_tel"`
}

func hashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// CORS 설정
	err := r.ParseForm()
	if err != nil {
		log.Printf("폼 파싱 실패: %v", err)
		http.Error(w, "잘못된 요청입니다", http.StatusBadRequest)
		return
	}

	// JSON 디코딩
	var creds Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		log.Printf("JSON 디코딩 실패: %v", err)
		http.Error(w, "잘못된 요청입니다.", http.StatusBadRequest)
		return
	}

	// 클라이언트 IP 주소 가져오기
	host := getClientIP(r)
	log.Printf("로그인 시도: ID=%s IP=%s", creds.ID, host)

	// 사용자 조회
	userAccount, err := repository.GetUserByID(creds.ID)
	if err != nil {
		if err == repository.ErrUserNotFound {
			log.Printf("사용자 없음: %s", creds.ID)
			http.Error(w, "인증 실패", http.StatusUnauthorized)
			repository.InsertLoginFail("7", creds.ID, host, config.Cfg.IP)
			return
		}
		log.Printf("DB 오류: %v", err)
		http.Error(w, "서버 오류", http.StatusInternalServerError)
		return
	}

	// 비밀번호 해시 비교
	inputHashed := hashPassword(creds.Passwd)
	if inputHashed != userAccount.Passwd {
		log.Printf("비밀번호 불일치 ID: %s", creds.ID)
		http.Error(w, "인증 실패", http.StatusUnauthorized)
		repository.InsertLoginFail("1", creds.ID, host, config.Cfg.IP)

		return
	}

	// 사용자 로그인 문제
	// 세션 생성
	session, _ := store.Get(r, "session-id")
	session.Values["id"] = creds.ID
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   1200, // 20분
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode, // or None (CORS시)
		Secure:   false,                // HTTPS에서만 사용 시
	}
	session.Save(r, w)
	repository.InsertLoginInfo(creds.ID, host, config.Cfg.IP)

	// 응답 설정
	w.WriteHeader(http.StatusOK)
	resp := LoginResponse{
		ID:        userAccount.ID,
		EmpName:   userAccount.EmpName,
		DeptName:  userAccount.DeptName,
		OfficeTel: userAccount.OfficeTel,
		MobileTel: userAccount.MobileTel,
	}
	json.NewEncoder(w).Encode(resp)
}

func getClientIP(r *http.Request) string {
	// 1. 프록시나 로드밸런서를 거칠 경우, X-Forwarded-For 헤더 확인
	ip := r.Header.Get("X-Forwarded-For")
	log.Printf("X-Forwarded-For: %s", ip)
	if ip != "" {
		// 여러 IP가 있을 경우 첫 번째가 원본 클라이언트 IP임
		ips := strings.Split(ip, ",")
		if len(ips) > 0 {
			return strings.TrimSpace(ips[0])
		}
	}

	// 2. X-Real-IP 헤더가 있으면 사용
	ip = r.Header.Get("X-Real-IP")
	log.Printf("X-Real-IP: %s", ip)
	if ip != "" {
		return ip
	}

	// 3. 위 헤더 없으면, 직접 연결 IP 사용
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	log.Printf("RemoteAddr: %s", r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return ip
}

func isUserLoginRestricted(w http.ResponseWriter, userAccount repository.UserAccount, loginID string, clientIP string) {
	// 비밀번호 변경 30일 경과 체크
	passwdUpdateDate, err := time.Parse("2006-01-02", userAccount.PasswdUpdateDate.String())
	if err != nil {
		log.Printf("비밀번호 변경일 파싱 오류 ID: %s, err: %v", loginID, err)
		http.Error(w, "서버 오류", http.StatusInternalServerError)
		return
	}
	if time.Since(passwdUpdateDate) > 30*24*time.Hour {
		log.Printf("비밀번호 변경 30일 초과 ID: %s", loginID)
		http.Error(w, "비밀번호 변경이 필요합니다", http.StatusUnauthorized)
		repository.InsertLoginFail("2", loginID, clientIP, config.Cfg.IP)
		return
	}

	// 15일 미접속 체크
	// DB 필드 is_long_unused가 'Y'면 15일 이상 미접속으로 판단 가능
	if strings.ToUpper(userAccount.IsLongUnused) == "Y" {
		log.Printf("15일 미접속으로 인한 로그인 제한 ID: %s", loginID)
		http.Error(w, "오랜 기간 미접속으로 인증 불가", http.StatusUnauthorized)
		repository.InsertLoginFail("3", loginID, clientIP, config.Cfg.IP)
		return
	}
}

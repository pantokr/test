package util

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"net"
	"net/http"
	"strings"
)

func GetClientIp(r *http.Request) string {
	if ip := r.Header.Get("X-Forwarded-For"); ip != "" {
		ips := strings.Split(ip, ",")
		return strings.TrimSpace(ips[0])
	}
	if ip := r.Header.Get("X-Real-Ip"); ip != "" {
		return ip
	}
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return ip
}

func GetServerIp() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", err
	}

	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && ipnet.IP.To4() != nil {
			return ipnet.IP.String(), nil
		}
	}
	return "", nil
}

func GenerateSalt(length int) (string, error) {
	// 원하는 길이만큼 바이트 배열 생성
	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}

	// hex 문자열로 변환해서 반환
	return hex.EncodeToString(bytes), nil
}

func CheckPassword(password, salt, hashedPassword string) bool {
	return HashPassword(password, salt) == hashedPassword
}

func HashPassword(password string, salt string) string {
	hash := sha256.Sum256([]byte(password + salt))
	pw := hex.EncodeToString(hash[:])
	return pw
}

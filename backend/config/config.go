package config

import (
	"fmt"
	"log"
	"net"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	IP              string
	Dsn             string
	TcpRecvUrl      string
	TcpRecvPort     string
	WebPort         string
	WebBuildDir     string
	SuperUserID     string
	SuperUserPasswd string
}

var Cfg Config

func Init() {
	// 로컬 IP 주소 가져오기
	addr, err := getLocalIP()

	if err != nil {
		log.Printf("IP 주소 가져오기 실패: %v\n", err)
		os.Exit(1)
	}
	log.Printf("IPv4 주소: %s\n", addr)

	if err := godotenv.Load(); err != nil {
		if strings.HasPrefix(addr, os.Getenv("PROP_IP")) {
			log.Println(".env 파일 로드 생략")
		} else {
			log.Println(".env 파일 로드 실패 (Docker):", err)
		}
	} else {
		log.Println(".env 파일 로드 성공")
	}

	if strings.HasPrefix(addr, os.Getenv("DEV_IP")) {
		log.Println("개발 환경 설정 로드")
		Cfg = Config{
			IP:          addr,
			Dsn:         os.Getenv("DEV_DSN"),
			TcpRecvUrl:  os.Getenv("DEV_TCP_RECV_URL"),
			TcpRecvPort: os.Getenv("DEV_TCP_RECV_PORT"),
			WebPort:     os.Getenv("DEV_WEB_PORT"),
			WebBuildDir: os.Getenv("DEV_WEB_BUILD_DIR"),
		}
	} else if strings.HasPrefix(addr, os.Getenv("PROD_IP")) {
		log.Println("운영 환경 설정 로드")
		Cfg = Config{
			IP:          addr,
			Dsn:         os.Getenv("PROD_DSN"),
			TcpRecvUrl:  os.Getenv("PROD_TCP_RECV_URL"),
			TcpRecvPort: os.Getenv("PROD_TCP_RECV_PORT"),
			WebPort:     os.Getenv("PROD_WEB_PORT"),
			WebBuildDir: os.Getenv("PROD_WEB_BUILD_DIR"),
		}
	} else {
		log.Printf("알 수 없는 IP 주소: %s\n", addr)
		os.Exit(1)
	}
	Cfg.SuperUserID = os.Getenv("SUPER_USER_ID")
	Cfg.SuperUserPasswd = os.Getenv("SUPER_USER_PASSWD")

	log.Printf("설정 로드 완료: %+v\n", Cfg)
}

func getLocalIP() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", err
	}

	var candidate string

	for _, addr := range addrs {
		if ipnet, ok := addr.(*net.IPNet); ok && !ipnet.IP.IsLoopback() {
			if ipnet.IP.To4() == nil {
				continue // IPv6는 무시
			}

			ip := ipnet.IP.String()

			// 192.168 대역이면 바로 반환
			if strings.HasPrefix(ip, "192.168.") {
				return ip, nil
			}

			// 우선 후보 저장 (172 등)
			if candidate == "" {
				candidate = ip
			}
		}
	}

	if candidate != "" {
		return candidate, nil
	}
	return "", fmt.Errorf("적절한 IPv4 주소를 찾을 수 없습니다")
}

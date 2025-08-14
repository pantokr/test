// internal/config/config.go
package config

import (
	"fmt"
	"log"
	"net"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Environment string

const (
	Development Environment = "development"
	Production  Environment = "production"
	Unknown     Environment = "unknown"
)

type Config struct {
	Environment Environment `json:"environment"`
	Server      ServerConfig
	Database    DatabaseConfig
	TCP         TCPConfig
	LocalIP     string `json:"local_ip"`
}

type ServerConfig struct {
	Port        string `json:"port"`
	WebBuildDir string `json:"web_build_dir"`
}

type DatabaseConfig struct {
	DSN string `json:"dsn"`
}

type TCPConfig struct {
	RecvURL  string `json:"recv_url"`
	RecvPort string `json:"recv_port"`
}

type SuperUserConfig struct {
	ID       string `json:"id"`
	Password string `json:"password"`
}

var globalConfig *Config

// Load는 환경 변수를 기반으로 설정을 로드합니다
func Load() (*Config, error) {
	if globalConfig != nil {
		return globalConfig, nil
	}

	// 로컬 IP 주소 가져오기
	localIP, err := getLocalIP()
	if err != nil {
		return nil, fmt.Errorf("IP 주소 가져오기 실패: %w", err)
	}
	log.Printf("로컬 IPv4 주소: %s", localIP)

	// .env 파일 로드 시도
	if err := loadEnvFile(localIP); err != nil {
		log.Printf("환경 변수 로드 중 경고: %v", err)
	}

	// 환경 결정
	env := determineEnvironment(localIP)
	if env == Unknown {
		return nil, fmt.Errorf("지원하지 않는 IP 주소: %s", localIP)
	}

	log.Printf("환경: %s", env)

	// 설정 생성
	config := &Config{
		Environment: env,
		LocalIP:     localIP,
		Server:      loadServerConfig(env),
		Database:    loadDatabaseConfig(env),
		TCP:         loadTCPConfig(env),
	}

	// 설정 검증
	if err := config.validate(); err != nil {
		return nil, fmt.Errorf("설정 검증 실패: %w", err)
	}

	globalConfig = config
	return config, nil
}

// GetConfig는 로드된 전역 설정을 반환합니다
func GetConfig() *Config {
	if globalConfig == nil {
		log.Fatal("설정이 로드되지 않았습니다. Load()를 먼저 호출하세요.")
	}
	return globalConfig
}

// loadEnvFile은 .env 파일을 로드합니다
func loadEnvFile(localIP string) error {
	if err := godotenv.Load(); err != nil {
		// 프로덕션 환경에서는 .env 파일이 없을 수 있음
		if strings.HasPrefix(localIP, os.Getenv("PROD_IP")) {
			log.Println(".env 파일 로드 생략 (프로덕션 환경)")
			return nil
		}
		return fmt.Errorf(".env 파일 로드 실패: %w", err)
	}
	log.Println(".env 파일 로드 성공")
	return nil
}

// determineEnvironment는 IP 주소를 기반으로 환경을 결정합니다
func determineEnvironment(localIP string) Environment {
	devIP := os.Getenv("DEV_IP")
	prodIP := os.Getenv("PROD_IP")

	switch {
	case devIP != "" && strings.HasPrefix(localIP, devIP):
		return Development
	case prodIP != "" && strings.HasPrefix(localIP, prodIP):
		return Production
	default:
		return Unknown
	}
}

// loadServerConfig는 서버 관련 설정을 로드합니다
func loadServerConfig(env Environment) ServerConfig {
	var prefix string
	switch env {
	case Development:
		prefix = "DEV_"
	case Production:
		prefix = "PROD_"
	}

	return ServerConfig{
		Port:        getEnvWithDefault(prefix+"WEB_PORT", "8080"),
		WebBuildDir: getEnvWithDefault(prefix+"WEB_BUILD_DIR", "./web/build"),
	}
}

// loadDatabaseConfig는 데이터베이스 관련 설정을 로드합니다
func loadDatabaseConfig(env Environment) DatabaseConfig {
	var prefix string
	switch env {
	case Development:
		prefix = "DEV_"
	case Production:
		prefix = "PROD_"
	}

	return DatabaseConfig{
		DSN: os.Getenv(prefix + "DSN"),
	}
}

// loadTCPConfig는 TCP 관련 설정을 로드합니다
func loadTCPConfig(env Environment) TCPConfig {
	var prefix string
	switch env {
	case Development:
		prefix = "DEV_"
	case Production:
		prefix = "PROD_"
	}

	return TCPConfig{
		RecvURL:  os.Getenv(prefix + "TCP_RECV_URL"),
		RecvPort: getEnvWithDefault(prefix+"TCP_RECV_PORT", "9090"),
	}
}

// validate는 필수 설정값들을 검증합니다
func (c *Config) validate() error {
	if c.Database.DSN == "" {
		return fmt.Errorf("데이터베이스 DSN이 설정되지 않았습니다")
	}
	if c.Server.Port == "" {
		return fmt.Errorf("서버 포트가 설정되지 않았습니다")
	}
	return nil
}

// IsProduction은 현재 환경이 프로덕션인지 확인합니다
func (c *Config) IsProduction() bool {
	return c.Environment == Production
}

// IsDevelopment는 현재 환경이 개발환경인지 확인합니다
func (c *Config) IsDevelopment() bool {
	return c.Environment == Development
}

// getEnvWithDefault는 환경 변수를 가져오고, 없으면 기본값을 반환합니다
func getEnvWithDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getLocalIP는 로컬 IPv4 주소를 가져옵니다
func getLocalIP() (string, error) {
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		return "", fmt.Errorf("네트워크 인터페이스 조회 실패: %w", err)
	}

	// 우선순위: 192.168.x.x > 172.x.x.x > 10.x.x.x > 기타
	var candidates []string

	for _, addr := range addrs {
		ipnet, ok := addr.(*net.IPNet)
		if !ok || ipnet.IP.IsLoopback() || ipnet.IP.To4() == nil {
			continue
		}

		ip := ipnet.IP.String()

		// 192.168 대역이면 최우선
		if strings.HasPrefix(ip, "192.168.") {
			return ip, nil
		}

		// 다른 사설 IP 대역들 수집
		if strings.HasPrefix(ip, "172.") || strings.HasPrefix(ip, "10.") {
			candidates = append(candidates, ip)
		}
	}

	if len(candidates) > 0 {
		return candidates[0], nil
	}

	return "", fmt.Errorf("적절한 IPv4 주소를 찾을 수 없습니다")
}

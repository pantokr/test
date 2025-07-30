package tcp

import (
	"backend/config"
	"fmt"
	"io"
	"log"
	"net"
)

func Receive() error {
	url := config.Cfg.TcpRecvUrl
	port := config.Cfg.TcpRecvPort
	listener, err := net.Listen("tcp", url+":"+port)
	if err != nil {
		log.Printf("TCP 서버 시작 실패: %v\n", err)
	}
	defer listener.Close()

	log.Printf("TCP 서버 실행 중 (포트: %s)...\n", port)

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("연결 수락 실패: %v\n", err)
			continue
		}
		go handleConnection(conn)
	}
}

// 연결 처리: 바이트 수신
func handleConnection(conn net.Conn) {
	defer conn.Close()

	buf := make([]byte, 1024)
	n, err := conn.Read(buf)
	if err != nil && err != io.EOF {
		fmt.Printf("수신 중 오류: %v\n", err)
		return
	}
	fmt.Printf("수신 데이터: %v\n", buf[:n])
}

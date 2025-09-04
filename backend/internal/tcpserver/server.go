package tcpserver

import (
	"fmt"
	"log"
	"net"
)

type Server struct {
	addr string
}

// New 생성자
func New(addr string) *Server {
	return &Server{addr: addr}
}

// Run TCP 서버 실행
func (s *Server) Run() {
	ln, err := net.Listen("tcp", s.addr)
	if err != nil {
		log.Fatalf("TCP 서버 시작 실패: %v", err)
	}
	defer ln.Close()

	log.Printf("TCP 서버 시작: %s", s.addr)

	for {
		conn, err := ln.Accept()
		if err != nil {
			log.Printf("연결 수락 실패: %v", err)
			continue
		}
		go s.handleConnection(conn)
	}
}

func (s *Server) handleConnection(conn net.Conn) {
	defer conn.Close()
	buf := make([]byte, 1024)

	for {
		n, err := conn.Read(buf)
		if err != nil {
			log.Printf("연결 종료: %v", err)
			return
		}
		msg := string(buf[:n])
		log.Printf("수신 메시지: %s", msg)

		// 간단한 에코 응답
		resp := fmt.Sprintf("서버에서 응답: %s", msg)
		conn.Write([]byte(resp))
	}
}

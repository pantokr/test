package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"time"
)

// -------------------- TCP 서버 --------------------
func startTCPServer(addr string) {
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("TCP 서버 시작 실패: %v", err)
	}
	defer ln.Close()
	log.Printf("TCP 서버 시작: %s", addr)

	for {
		conn, err := ln.Accept()
		if err != nil {
			log.Printf("연결 수락 실패: %v", err)
			continue
		}
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()
	reader := bufio.NewReader(conn)

	for {
		msg, err := reader.ReadString('\n') // 메시지 경계: 개행
		if err != nil {
			log.Printf("연결 종료: %v", err)
			return
		}
		msg = msg[:len(msg)-1] // 개행 제거
		log.Printf("수신 메시지: %s", msg)

		resp := fmt.Sprintf("서버 응답: %s\n", msg)
		_, _ = conn.Write([]byte(resp))
	}
}

// -------------------- 테스트용 클라이언트 --------------------
func startTestClient(addr string, messages []string) {
	time.Sleep(1 * time.Second) // 서버가 먼저 시작될 수 있도록 잠시 대기
	conn, err := net.Dial("tcp", addr)
	if err != nil {
		log.Fatalf("클라이언트 연결 실패: %v", err)
	}
	defer conn.Close()

	reader := bufio.NewReader(conn)

	for _, msg := range messages {
		fmt.Printf("클라이언트 송신: %s\n", msg)
		_, _ = conn.Write([]byte(msg + "\n"))

		resp, _ := reader.ReadString('\n')
		fmt.Printf("클라이언트 수신: %s", resp)
	}
}

func main() {
	addr := "localhost:9000"

	// TCP 서버 고루틴으로 실행
	go startTCPServer(addr)

	// 테스트용 메시지
	messages := []string{
		"Hello TCP",
		"한글 테스트",
		"테스트 123",
	}

	// 테스트 클라이언트 실행
	startTestClient(addr, messages)

	fmt.Println("테스트 완료")
}

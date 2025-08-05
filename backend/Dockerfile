# 1단계: Go 빌드 환경
FROM golang:1.24 AS build
WORKDIR /app

# go.mod, go.sum 먼저 복사 → 캐시 최적화
COPY go.mod go.sum ./
RUN go mod download

# 소스 복사
COPY . .

# main.go 위치 지정해서 빌드
RUN go build -o server ./cmd/server

# 2단계: 실행 환경 (Debian 기반)
FROM debian:bookworm-slim

WORKDIR /app
COPY --from=build /app/server .

EXPOSE 8180
CMD ["./server"]

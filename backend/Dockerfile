# 1단계: Go 빌드 환경
FROM golang:1.24 AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o app .

# 2단계: 실행 환경 (Debian 기반)
FROM debian:bookworm-slim

WORKDIR /app
COPY --from=build /app/app .

EXPOSE 8180
CMD ["./app"]

FROM node:18-alpine AS build
WORKDIR /app

# 종속성 설치 (캐시 최적화)
COPY package*.json ./
RUN npm install

# 소스 복사 후 빌드
COPY . .
RUN npm run build

# serve로 정적 파일 제공
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 3100
CMD ["serve", "-s", "build", "-l", "3100"]

module backend

go 1.24.5

require (
	// Database driver
	github.com/go-sql-driver/mysql v1.9.3

	// Session management
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/sessions v1.4.0
	github.com/joho/godotenv v1.5.1
	github.com/rs/cors v1.8.2
)

require (
	filippo.io/edwards25519 v1.1.0 // indirect
	github.com/gorilla/securecookie v1.1.2 // indirect
)

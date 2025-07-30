package repository

import (
	"backend/db"
)

// InsertLoginInfo : 로그인 시 기록 추가
func InsertLoginFail(failCode, loginID, clientIP, serverIP string) error {
	database := db.GetDatabase()

	_, err := database.Exec(`INSERT INTO login_fail (login_date, fail_code, login_id, client_ip, server_ip)
              VALUES (CURRENT_DATE(), ?, ?, ?, ?)`, failCode, loginID, clientIP, serverIP)
	return err
}

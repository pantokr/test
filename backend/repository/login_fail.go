package repository

import (
	"backend/db"
	"time"
)

// LoginInfo 구조체 정의 (조회 결과를 담기 위한 구조체)
type LoginFail struct {
	LoginID   string     `json:"login_id"`
	LoginTime *time.Time `json:"login_time"`
	FailCode  string     `json:"fail_code"`
	ClientIP  string     `json:"client_ip"`
	ServerIP  string     `json:"server_ip"`
}

// SelectLoginInfoAll : login_info 테이블의 모든 로그인 기록 조회
func SelectLoginFailAll() ([]LoginFail, error) {
	database := db.GetDatabase()

	query := `SELECT login_id, login_time, fail_code, client_ip, server_ip FROM login_fail ORDER BY login_time DESC`

	rows, err := database.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var loginFails []LoginFail

	for rows.Next() {
		var lf LoginFail
		err := rows.Scan(
			&lf.LoginID,
			&lf.LoginTime,
			&lf.FailCode,
			&lf.ClientIP,
			&lf.ServerIP,
		)
		if err != nil {
			return nil, err
		}
		loginFails = append(loginFails, lf)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginFails, nil
}

// InsertLoginInfo : 로그인 시 기록 추가
func InsertLoginFail(failCode, loginID, clientIP, serverIP string) error {
	database := db.GetDatabase()
	_, err := database.Exec(`INSERT INTO login_fail (login_time, fail_code, login_id, client_ip, server_ip)
              VALUES (NOW(), ?, ?, ?, ?)`, failCode, loginID, clientIP, serverIP)
	return err
}

package repository

import (
	"backend/db"
	"time"
)

type LoginReset struct {
	ResetTime   *time.Time `json:"reset_time"`
	ResetCode   string     `json:"reset_code"`
	LoginID     string     `json:"login_id"`
	ResetID     string     `json:"reset_id"`
	ResetReason string     `json:"reset_reason"`
	PrevLoginIP string     `json:"prev_login_ip"`
}

// SelectLoginInfoAll : login_info 테이블의 모든 로그인 기록 조회
func SelectLoginResetAll() ([]LoginReset, error) {
	database := db.GetDatabase()

	query := `SELECT reset_time, reset_code, login_id, reset_id, reset_reason, prev_login_ip FROM login_reset ORDER BY reset_time DESC`

	rows, err := database.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var loginResets []LoginReset

	for rows.Next() {
		var lr LoginReset
		err := rows.Scan(
			&lr.ResetTime,
			&lr.ResetCode,
			&lr.LoginID,
			&lr.ResetID,
			&lr.ResetReason,
			&lr.PrevLoginIP,
		)
		if err != nil {
			return nil, err
		}
		loginResets = append(loginResets, lr)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginResets, nil
}

// InsertLoginInfo : 로그인 시 기록 추가
func InsertLoginReset(failCode, loginID, clientIP, serverIP string) error {
	database := db.GetDatabase()
	_, err := database.Exec(`INSERT INTO login_reset (reset_time, reset_code, login_id, reset_id, reset_reason, prev_login_ip)
              VALUES (NOW(), ?, ?, ?, ?)`, failCode, loginID, clientIP, serverIP)
	return err
}

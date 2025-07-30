package repository

import (
	"backend/db"
	"database/sql"
	"errors"
)

// InsertLoginInfo : 로그인 시 기록 추가
func InsertLoginInfo(loginID string, userIP string, serverIP string) error {
	database := db.GetDatabase()

	// emp_name 가져오기
	var empName string
	query := `SELECT emp_name FROM user_account WHERE login_id = ?`
	err := database.QueryRow(query, loginID).Scan(&empName)

	if err == sql.ErrNoRows {
		return errors.New("user_account에서 해당 id를 찾을 수 없습니다")
	} else if err != nil {
		return err
	}

	query = `INSERT INTO login_info (login_id, emp_name, login_time, is_external, user_ip, server_ip)
			  VALUES (?, ?, NOW(), ?, ?, ?)`
	// login_info insert (login_time은 DB NOW()로 처리)
	_, err = database.Exec(query, loginID, empName, "0", userIP, serverIP)

	return err
}

// UpdateLogoutTime : 로그아웃 시 로그아웃 시간 기록
func UpdateLogoutTime(loginID string) error {
	database := db.GetDatabase()

	// 가장 최근 로그인 기록(logout_time이 NULL인 row)만 업데이트
	query := `UPDATE login_info
			 SET logout_time = NOW()
			 WHERE login_id = ? AND logout_time IS NULL
			 ORDER BY login_time DESC
			 LIMIT 1`

	result, err := database.Exec(query, loginID)

	if err != nil {
		return err
	}

	// 업데이트된 행의 수 확인
	affected, _ := result.RowsAffected()
	if affected == 0 {
		return errors.New("로그아웃할 로그인 세션을 찾을 수 없습니다")
	}

	return nil
}

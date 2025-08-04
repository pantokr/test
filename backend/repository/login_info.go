package repository

import (
	"backend/db"
	"database/sql"
	"errors"
	"time"
)

// LoginInfo 구조체 정의 (조회 결과를 담기 위한 구조체)
type LoginInfo struct {
	LoginID    string     `json:"login_id"`
	EmpName    string     `json:"emp_name"`
	LoginTime  *time.Time `json:"login_time"`
	LogoutTime *time.Time `json:"logout_time"`
	IsExternal string     `json:"is_external"`
	ClientIP   string     `json:"client_ip"`
	ServerIP   string     `json:"server_ip"`
}

// SelectLoginInfoAll : login_info 테이블의 모든 로그인 기록 조회
func SelectLoginInfoAll() ([]LoginInfo, error) {
	database := db.GetDatabase()

	query := `SELECT login_id, emp_name, login_time, logout_time, is_external, client_ip, server_ip FROM login_info ORDER BY login_time DESC`

	rows, err := database.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var loginInfos []LoginInfo

	for rows.Next() {
		var li LoginInfo
		err := rows.Scan(
			&li.LoginID,
			&li.EmpName,
			&li.LoginTime,
			&li.LogoutTime,
			&li.IsExternal,
			&li.ClientIP,
			&li.ServerIP,
		)
		if err != nil {
			return nil, err
		}
		loginInfos = append(loginInfos, li)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginInfos, nil
}

// InsertLoginInfo : 로그인 시 기록 추가
func InsertLoginInfo(loginID string, clientIP string, serverIP string) error {
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

	query = `INSERT INTO login_info (login_id, emp_name, login_time, is_external, client_ip, server_ip)
			  VALUES (?, ?, NOW(), ?, ?, ?)`
	// login_info insert (login_time은 DB NOW()로 처리)
	_, err = database.Exec(query, loginID, empName, "0", clientIP, serverIP)

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

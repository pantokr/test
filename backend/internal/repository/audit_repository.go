package repository

import (
	"fmt"
	"lms/internal/handler/dto/response"
	"lms/internal/model"
	"lms/internal/repository/interfaces"
	"lms/pkg/database"
)

type AuditRepository struct {
	db *database.DB
}

func InitAuditRepository(db *database.DB) interfaces.AuditRepositoryInterface {
	return &AuditRepository{db: db}
}

func (r *AuditRepository) InsertLoginHistory(loginID, clientIP, serverIP string) error {
	const empQuery = `SELECT emp_name FROM user_account WHERE login_id = ?`
	var empName string
	err := r.db.QueryRow(empQuery, loginID).Scan(&empName)
	if err != nil {
		return fmt.Errorf("emp_name 조회 실패: %w", err)
	}

	const query = `
		INSERT INTO login_history 
		(login_id, emp_name, login_time, is_external, client_ip, server_ip)
		VALUES (?, ?, NOW(), ?, ?, ?)
	`
	_, err = r.db.Exec(query, loginID, empName, "0", clientIP, serverIP)
	if err != nil {
		return fmt.Errorf("로그인 기록 삽입 실패: %w", err)
	}
	return nil
}

func (r *AuditRepository) SelectLoginHistoryAll() ([]model.LoginHistory, error) {
	const query = `
		SELECT 
			IFNULL(login_id, '') AS login_id,
			IFNULL(emp_name, '') AS emp_name, 
			login_time AS login_time,
			logout_time AS logout_time,
			IFNULL(is_external, '') AS is_external,
			IFNULL(client_ip, '') AS client_ip,
			IFNULL(server_ip, '') AS server_ip
		FROM login_history
		ORDER BY login_time DESC
	`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("로그인 기록 조회 실패: %w", err)
	}
	defer rows.Close()

	var loginHistory []model.LoginHistory
	for rows.Next() {
		var lh model.LoginHistory
		if err := rows.Scan(&lh.LoginID, &lh.EmpName, &lh.LoginTime, &lh.LogoutTime, &lh.IsExternal, &lh.ClientIP, &lh.ServerIP); err != nil {
			return nil, err
		}
		loginHistory = append(loginHistory, lh)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginHistory, nil
}

func (r *AuditRepository) InsertLoginFailureHistory(failCode, loginID, clientIP, serverIP string) error {
	const query = `
		INSERT INTO login_failure_history 
		(login_time, fail_code, login_id, client_ip, server_ip)
		VALUES (NOW(), ?, ?, ?, ?)
	`
	_, err := r.db.Exec(query, failCode, loginID, clientIP, serverIP)
	if err != nil {
		return fmt.Errorf("로그인 실패 기록 삽입 실패: %w", err)
	}
	return nil
}

func (r *AuditRepository) SelectLoginFailureHistoryAll() ([]response.LoginFailureHistoryResponse, error) {
	const query = `
		SELECT 
			login_id, 
			IFNULL(DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s'), '') AS login_time,
			IFNULL(fail_code, '') AS fail_code, 
			IFNULL(client_ip, '') AS client_ip, 
			IFNULL(server_ip, '') AS server_ip 
		FROM login_failure_history 
		ORDER BY login_time DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("로그인 실패 이력 조회 실패: %w", err)
	}
	defer rows.Close()

	// var loginFails []response.LoginFailureResponse
	// for rows.Next() {
	// 	var lf response.LoginFailResponse
	// 	if err := rows.Scan(&lf.LoginID, &lf.LoginTime, &lf.FailCode, &lf.ClientIP, &lf.ServerIP); err != nil {
	// 		return nil, err
	// 	}
	// 	loginFails = append(loginFails, lf)
	// }
	// if err = rows.Err(); err != nil {
	// 	return nil, err
	// }
	// return loginFails, nil
	return nil, fmt.Errorf("로그인 실패 이력 조회는 아직 구현되지 않았습니다")
}

func (r *AuditRepository) InsertLoginResetHistory(resetCode, loginID, resetID, resetReason, prevLoginIP string) error {
	const query = `
		INSERT INTO login_reset_history 
		(reset_time, reset_code, login_id, reset_id, reset_reason, prev_login_ip)
		VALUES (NOW(), ?, ?, ?, ?, ?)
	`
	_, err := r.db.Exec(query, resetCode, loginID, resetID, resetReason, prevLoginIP)
	if err != nil {
		return fmt.Errorf("로그인 리셋 기록 삽입 실패: %w", err)
	}
	return nil
}

func (r *AuditRepository) SelectLoginResetHistoryAll() ([]response.LoginResetResponse, error) {
	const query = `
		SELECT 
			IFNULL(DATE_FORMAT(reset_time, '%Y-%m-%d %H:%i:%s'), '') AS reset_time, 
			IFNULL(reset_code, '') AS reset_code, 
			IFNULL(login_id, '') AS login_id, 
			IFNULL(reset_id, '') AS reset_id, 
			IFNULL(reset_reason, '') AS reset_reason, 
			IFNULL(prev_login_ip, '') AS prev_login_ip 
		FROM login_reset_history
		ORDER BY reset_time DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("로그인 리셋 이력 조회 실패: %w", err)
	}
	defer rows.Close()

	var loginResets []response.LoginResetResponse
	for rows.Next() {
		var lr response.LoginResetResponse
		if err := rows.Scan(&lr.ResetTime, &lr.ResetCode, &lr.LoginID, &lr.ResetID, &lr.ResetReason, &lr.PrevLoginIP); err != nil {
			return nil, err
		}
		loginResets = append(loginResets, lr)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return loginResets, nil
}

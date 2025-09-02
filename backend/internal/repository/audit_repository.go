package repository

import (
	"fmt"
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

// InsertLoginHistory - 로그인 기록 삽입
func (r *AuditRepository) InsertLoginHistory(history *model.LoginHistory) (int64, error) {

	const query = `
		INSERT INTO login_history 
		(login_id, emp_name, login_time, is_external, client_ip, server_ip)
		VALUES (?, ?, NOW(), ?, ?, ?)
	`
	result, err := r.db.Exec(query, history.LoginId, history.EmpName, "N", history.ClientIp, history.ServerIp)
	if err != nil {
		return 0, fmt.Errorf("로그인 기록 삽입 실패: %w", err)
	}

	insertedId, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("삽입된 Id 조회 실패: %w", err)
	}

	return insertedId, nil
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
		if err := rows.Scan(&lh.LoginId, &lh.EmpName, &lh.LoginTime, &lh.LogoutTime, &lh.IsExternal, &lh.ClientIp, &lh.ServerIp); err != nil {
			return nil, err
		}
		loginHistory = append(loginHistory, lh)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginHistory, nil
}

func (r *AuditRepository) UpdateLoginHistoryLogoutTime(sessionId int64) error {
	const query = `
		UPDATE login_history 
		SET logout_time = NOW()
		WHERE id = ? AND logout_time IS NULL
	`
	result, err := r.db.Exec(query, sessionId)
	if err != nil {
		return fmt.Errorf("로그아웃 시간 업데이트 실패: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("영향받은 행 수 확인 실패: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("유효하지 않은 세션이거나 이미 로그아웃된 세션입니다")
	}

	return nil
}

func (r *AuditRepository) InsertLoginFailureHistory(failure *model.LoginFailureHistory) error {
	const query = `
		INSERT INTO login_failure_history 
		(login_time, fail_code, login_id, client_ip, server_ip)
		VALUES (NOW(), ?, ?, ?, ?)
	`
	_, err := r.db.Exec(query, failure.FailCode, failure.LoginId, failure.ClientIp, failure.ServerIp)
	if err != nil {
		return fmt.Errorf("로그인 실패 기록 삽입 실패: %w", err)
	}
	return nil
}

func (r *AuditRepository) SelectLoginFailureHistoryAll() ([]model.LoginFailureHistory, error) {
	const query = `
		SELECT 
			IFNULL(login_id, '') AS login_id,
			login_time AS login_time,
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

	var loginFailures []model.LoginFailureHistory

	for rows.Next() {
		var lf model.LoginFailureHistory
		if err := rows.Scan(&lf.LoginId, &lf.LoginTime, &lf.FailCode, &lf.ClientIp, &lf.ServerIp); err != nil {
			return nil, err
		}
		loginFailures = append(loginFailures, lf)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginFailures, nil
}

func (r *AuditRepository) InsertLoginResetHistory(reset *model.LoginResetHistory) error {
	const query = `
		INSERT INTO login_reset_history 
		(reset_time, reset_code, login_id, reset_id, reset_reason, prev_login_ip)
		VALUES (?, ?, ?, ?, ?, ?)
	`
	_, err := r.db.Exec(query, reset.ResetTime, reset.ResetCode, reset.LoginId, reset.ResetId, reset.ResetReason, reset.PrevLoginIp)
	if err != nil {
		return fmt.Errorf("로그인 리셋 기록 삽입 실패: %w", err)
	}
	return nil
}

func (r *AuditRepository) SelectLoginResetHistoryAll() ([]model.LoginResetHistory, error) {
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

	var loginResets []model.LoginResetHistory
	for rows.Next() {
		var lr model.LoginResetHistory
		if err := rows.Scan(&lr.ResetTime, &lr.ResetCode, &lr.LoginId, &lr.ResetId, &lr.ResetReason, &lr.PrevLoginIp); err != nil {
			return nil, err
		}
		loginResets = append(loginResets, lr)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginResets, nil
}

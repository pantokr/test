package repository

import (
	"errors"
	"fmt"
	"lms/internal/handler/dto/request"
	"lms/internal/handler/dto/response"
	"lms/internal/model"
	"lms/pkg/database"
)

type AuthRepository struct {
	db *database.DB
}

func InitAuthRepository(db *database.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) InsertUserAccount(user request.UserRegisterRequest) error {
	const query = `
		INSERT INTO user_account (
			login_id, passwd, emp_name, dept_name, office_tel, mobile_tel,
			recent_conn_date, delete_date, passwd_update_date, pw_fail_count,
			is_long_unused, is_external, client_ip, pw_ref,
			reg_emp_id, reg_date, upd_emp_id, upd_date)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, NOW())
	`
	_, err := r.db.Exec(query, user.LoginID, user.Passwd, user.EmpName, user.DeptName, user.OfficeTel, user.MobileTel, nil, nil, nil, 0, "N", "N", nil, nil, "", "")
	if err != nil {
		return fmt.Errorf("사용자 등록 실패: %w", err)
	}
	return nil
}

func (r *AuthRepository) SelectUserAccountByID(id string) (*model.UserAccount, error) {
	var user model.UserAccount

	const query = `
		SELECT login_id, passwd, emp_name, dept_name, office_tel, mobile_tel,
			   recent_conn_date, delete_date, passwd_update_date, pw_fail_count,
			   is_long_unused, is_external, client_ip, pw_ref,
			   reg_emp_id, reg_date, upd_emp_id, upd_date
		FROM user_account
		WHERE login_id = ?
	`

	err := r.db.QueryRow(query, id).Scan(
		&user.LoginID, &user.Passwd, &user.EmpName, &user.DeptName, &user.OfficeTel, &user.MobileTel,
		&user.RecentConnDate, &user.DeleteDate, &user.PasswdUpdateDate, &user.PwFailCount,
		&user.IsLongUnused, &user.IsExternal, &user.ClientIP, &user.PwRef,
		&user.RegEmpID, &user.RegDate, &user.UpdEmpID, &user.UpdDate,
	)

	if err != nil {
		return nil, fmt.Errorf("사용자 조회 실패: %w", err)
	}
	return &user, nil
}

func (r *AuthRepository) UpdateUserAccountLogoutTime(loginID string) error {
	const query = `
		UPDATE login_history
		SET logout_time = NOW()
		WHERE login_id = ? AND logout_time IS NULL
		ORDER BY login_time DESC
		LIMIT 1
	`
	result, err := r.db.Exec(query, loginID)
	if err != nil {
		return fmt.Errorf("로그아웃 시간 업데이트 실패: %w", err)
	}

	affected, _ := result.RowsAffected()
	if affected == 0 {
		return errors.New("로그아웃할 로그인 세션을 찾을 수 없습니다")
	}

	return nil
}

func (r *AuthRepository) UpdateUserAccountLoginFail(loginID string) error {
	const query = `
		UPDATE user_account
		SET pw_fail_count = pw_fail_count + 1
		WHERE login_id = ?
	`
	_, err := r.db.Exec(query, loginID)
	if err != nil {
		return fmt.Errorf("로그인 실패 횟수 업데이트 실패: %w", err)
	}
	return nil
}

func (r *AuthRepository) UpdateUserAccountLoginSuccess(loginID string) error {
	const query = `
		UPDATE user_account
		SET pw_fail_count = 0,
		    recent_conn_date = NOW()
		WHERE login_id = ?
	`
	_, err := r.db.Exec(query, loginID)
	if err != nil {
		return fmt.Errorf("로그인 성공 처리 실패: %w", err)
	}
	return nil
}

func (r *AuthRepository) UpdateIsLongUnused(loginID string) error {
	const query = `
		UPDATE user_account
		SET is_long_unused = 1,
		    recent_conn_date = NOW()
		WHERE login_id = ?
	`
	_, err := r.db.Exec(query, loginID)
	if err != nil {
		return fmt.Errorf("장기 미사용 업데이트 실패: %w", err)
	}
	return nil
}

func (r *AuthRepository) SelectLoginHistoryAll() ([]model.LoginHistory, error) {
	const query = `
		SELECT 
			login_id, 
			IFNULL(emp_name, '') AS emp_name, 
			IFNULL(DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s'), '') AS login_time,
			IFNULL(DATE_FORMAT(logout_time, '%Y-%m-%d %H:%i:%s'), '') AS logout_time,
			IFNULL(is_external, '') AS is_external,
			IFNULL(client_ip, '') AS client_ip,
			IFNULL(server_ip, '') AS server_ip
		FROM login_history
		ORDER BY login_time DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("로그인 정보 조회 실패: %w", err)
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

func (r *AuthRepository) InsertLoginInfo(loginID, clientIP, serverIP string) error {
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

func (r *AuthRepository) InsertLoginFail(failCode, loginID, clientIP, serverIP string) error {
	const query = `
		INSERT INTO login_fail_history 
		(login_time, fail_code, login_id, client_ip, server_ip)
		VALUES (NOW(), ?, ?, ?, ?)
	`
	_, err := r.db.Exec(query, failCode, loginID, clientIP, serverIP)
	if err != nil {
		return fmt.Errorf("로그인 실패 기록 삽입 실패: %w", err)
	}
	return nil
}

func (r *AuthRepository) SelectLoginFailAll() ([]response.LoginFailResponse, error) {
	const query = `
		SELECT 
			login_id, 
			IFNULL(DATE_FORMAT(login_time, '%Y-%m-%d %H:%i:%s'), '') AS login_time,
			IFNULL(fail_code, '') AS fail_code, 
			IFNULL(client_ip, '') AS client_ip, 
			IFNULL(server_ip, '') AS server_ip 
		FROM login_fail_history 
		ORDER BY login_time DESC
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("로그인 실패 이력 조회 실패: %w", err)
	}
	defer rows.Close()

	var loginFails []response.LoginFailResponse
	for rows.Next() {
		var lf response.LoginFailResponse
		if err := rows.Scan(&lf.LoginID, &lf.LoginTime, &lf.FailCode, &lf.ClientIP, &lf.ServerIP); err != nil {
			return nil, err
		}
		loginFails = append(loginFails, lf)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return loginFails, nil
}

func (r *AuthRepository) InsertLoginReset(resetCode, loginID, resetID, resetReason, prevLoginIP string) error {
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

func (r *AuthRepository) SelectLoginResetAll() ([]response.LoginResetResponse, error) {
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

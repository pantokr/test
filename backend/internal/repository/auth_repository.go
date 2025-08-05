package repository

import (
	"errors"
	"lms/internal/model"
	"lms/pkg/database"
)

type AuthRepository struct {
	db *database.DB
}

func InitAuthRepository(db *database.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) SelectUserByID(id string) (*model.UserAccount, error) {
	var user model.UserAccount

	query := `
		SELECT 
			login_id, 
			passwd, 
			emp_name, 
			dept_name, 
			office_tel, 
			mobile_tel,
			recent_conn_date,
			delete_date,
			passwd_update_date,
			pw_fail_count,
			is_long_unused,
			is_external,
			client_ip,
			pw_ref,
			reg_emp_id,
			reg_date,
			upd_emp_id,
			upd_date
		FROM user_account
		WHERE login_id = ?
	`

	err := r.db.QueryRow(query, id).Scan(
		&user.ID,
		&user.Passwd,
		&user.EmpName,
		&user.DeptName,
		&user.OfficeTel,
		&user.MobileTel,
		&user.RecentConnDate,
		&user.DeleteDate,
		&user.PasswdUpdateDate,
		&user.PwFailCount,
		&user.IsLongUnused,
		&user.IsExternal,
		&user.ClientIP,
		&user.PwRef,
		&user.RegEmpID,
		&user.RegDate,
		&user.UpdEmpID,
		&user.UpdDate,
	)

	if err != nil {
		return nil, err
	}
	return &user, nil
}

// UpdateLogoutTime : 로그아웃 시 로그아웃 시간 기록
func (r *AuthRepository) UpdateLogoutTime(loginID string) error {
	database := r.db

	query := `
		UPDATE login_info
		SET logout_time = NOW()
		WHERE login_id = ? AND logout_time IS NULL
		ORDER BY login_time DESC
		LIMIT 1`

	result, err := database.Exec(query, loginID)
	if err != nil {
		return err
	}

	affected, _ := result.RowsAffected()
	if affected == 0 {
		return errors.New("로그아웃할 로그인 세션을 찾을 수 없습니다")
	}

	return nil
}

// InsertLoginInfo : 로그인 시 기록 추가
func (r *AuthRepository) InsertLoginInfo(loginID string, clientIP string, serverIP string) error {

	// emp_name 가져오기
	var empName string
	query := `SELECT emp_name FROM user_account WHERE login_id = ?`
	err := r.db.QueryRow(query, loginID).Scan(&empName)

	if err != nil {
		return err
	}

	query = `
		INSERT INTO login_info 
			(login_id, emp_name, login_time, is_external, client_ip, server_ip)
		VALUES (?, ?, NOW(), ?, ?, ?)`
	_, err = r.db.Exec(query, loginID, empName, "0", clientIP, serverIP)

	return err
}

func (r *AuthRepository) SelectLoginInfoAll() ([]model.LoginInfo, error) {

	query := `
		SELECT 
			login_id, 
			emp_name, 
			login_time,
			logout_time,
			is_external, 
			client_ip, 
			server_ip 
		FROM login_info 
		ORDER BY login_time DESC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var loginInfo []model.LoginInfo

	for rows.Next() {
		var li model.LoginInfo
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
		loginInfo = append(loginInfo, li)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return loginInfo, nil
}

// UpdateLoginFailCount : 로그인 실패 횟수 업데이트
func (r *AuthRepository) UpdateLoginFail(loginID string) error {
	_, err := r.db.Exec(`
		UPDATE user_account
			SET pw_fail_count = pw_fail_count + 1
		WHERE login_id = ?`, loginID)
	return err
}

func (r *AuthRepository) UpdateLoginSuccess(loginID string) error {
	_, err := r.db.Exec(`
		UPDATE user_account
			SET pw_fail_count = 0,
			SET recent_conn_date = NOW()
		WHERE login_id = ?`, loginID)
	return err
}

// InsertLoginFail : 로그인 실패 기록 추가
func (r *AuthRepository) InsertLoginFail(failCode, loginID, clientIP, serverIP string) error {
	_, err := r.db.Exec(
		`INSERT INTO login_fail (login_time, fail_code, login_id, client_ip, server_ip)
		 VALUES (NOW(), ?, ?, ?, ?)`,
		failCode, loginID, clientIP, serverIP,
	)
	return err
}
func (r *AuthRepository) SelectLoginFailAll() ([]model.LoginFail, error) {

	query := `
		SELECT 
			login_id, 
			login_time,
			fail_code, 
			client_ip, 
			server_ip 
		FROM login_fail 
		ORDER BY login_time DESC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var loginFails []model.LoginFail

	for rows.Next() {
		var lf model.LoginFail
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

// InsertLoginReset : 초기화 기록 추가
func (r *AuthRepository) InsertLoginReset(resetCode, loginID, resetID, resetReason, prevLoginIP string) error {
	_, err := r.db.Exec(`
		INSERT INTO login_reset (reset_time, reset_code, login_id, reset_id, reset_reason, prev_login_ip)
		VALUES (NOW(), ?, ?, ?, ?, ?)`,
		resetCode, loginID, resetID, resetReason, prevLoginIP,
	)
	return err
}
func (r *AuthRepository) SelectLoginResetAll() ([]model.LoginReset, error) {
	query := `
		SELECT 
			reset_time, 
			reset_code, 
			login_id, 
			reset_id, 
			reset_reason, 
			prev_login_ip 
		FROM login_reset 
		ORDER BY reset_time DESC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var loginResets []model.LoginReset

	for rows.Next() {
		var lr model.LoginReset
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

package repository

import (
	"errors"
	"fmt"
	"lms/internal/model"
	"lms/internal/repository/interfaces"
	"lms/pkg/database"
)

type UserRepository struct {
	db *database.DB
}

func InitUserRepository(db *database.DB) interfaces.UserRepositoryInterface {
	return &UserRepository{db: db}
}

// func (r *UserRepository) InsertUserAccount(user request.UserRegisterRequest) error {
// 	const query = `
// 		INSERT INTO user_account (
// 			login_id, passwd, emp_name, dept_name, office_tel, mobile_tel,
// 			recent_conn_date, delete_date, passwd_update_date, pw_fail_count,
// 			is_long_unused, is_external, client_ip, pw_ref,
// 			reg_emp_id, reg_date, upd_emp_id, upd_date)
// 		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, NOW())
// 	`
// 	_, err := r.db.Exec(query, user.LoginID, user.Passwd, user.EmpName, user.DeptName, user.OfficeTel, user.MobileTel, nil, nil, nil, 0, "N", "N", nil, nil, "", "")
// 	if err != nil {
// 		return fmt.Errorf("사용자 등록 실패: %w", err)
// 	}
// 	return nil
// }

func (r *UserRepository) SelectUserAccountByID(id string) (*model.UserAccount, error) {
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

func (r *UserRepository) UpdateUserAccountLogoutTime(loginID string) error {
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

func (r *UserRepository) UpdateUserAccountLoginFailure(loginID string) error {
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

func (r *UserRepository) UpdateUserAccountLoginSuccess(loginID string) error {
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

package repository

import (
	"fmt"
	"lms/internal/model"
	"lms/internal/repository/interfaces"
	"lms/pkg/database"
	"strings"
)

type UserRepository struct {
	db *database.DB
}

func InitUserRepository(db *database.DB) interfaces.UserRepositoryInterface {
	return &UserRepository{db: db}
}

func (r *UserRepository) InsertUserAccount(user *model.UserAccount) error {
	const query = `
		INSERT INTO user_account (
			login_id, passwd, emp_name, dpt_name, office_tel, mobile_tel,
			recent_conn_date, delete_date, passwd_update_date, pw_fail_count,
			client_ip, pw_ref, reg_emp_id, reg_date, upd_emp_id, upd_date)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`
	_, err := r.db.Exec(query, user.LoginID, user.Passwd, user.EmpName, user.DptName, user.OfficeTel, user.MobileTel, user.RecentConnDate, user.DeleteDate, user.PasswdUpdateDate, user.PwFailCount, user.ClientIP, user.PwRef, user.RegEmpID, user.RegDate, user.UpdEmpID, user.UpdDate)
	if err != nil {
		if strings.Contains(err.Error(), "Duplicate entry") {
			return fmt.Errorf("이미 존재하는 사용자 ID입니다")
		}
		return fmt.Errorf("사용자 등록 실패: %w", err)
	}
	return nil
}

func (r *UserRepository) SelectUserAccountByID(id string) (*model.UserAccount, error) {
	var user model.UserAccount

	const query = `
		SELECT login_id, passwd, emp_name, dpt_name, office_tel, mobile_tel,
			   recent_conn_date, delete_date, passwd_update_date, pw_fail_count, 
			   client_ip, pw_ref, reg_emp_id, reg_date, upd_emp_id, upd_date
		FROM user_account
		WHERE login_id = ?
	`

	err := r.db.QueryRow(query, id).Scan(
		&user.LoginID, &user.Passwd, &user.EmpName, &user.DptName, &user.OfficeTel, &user.MobileTel,
		&user.RecentConnDate, &user.DeleteDate, &user.PasswdUpdateDate, &user.PwFailCount,
		&user.ClientIP, &user.PwRef, &user.RegEmpID, &user.RegDate, &user.UpdEmpID, &user.UpdDate,
	)

	if err != nil {
		return nil, fmt.Errorf("사용자 조회 실패: %w", err)
	}
	return &user, nil
}

func (r *UserRepository) UpdateUserAccountLoginFailureByID(loginID string) error {
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

func (r *UserRepository) UpdateUserAccountLoginSuccess(user *model.UserAccount) error {
	const query = `
		UPDATE user_account
		SET pw_fail_count = 0,
		    recent_conn_date = ?,
			client_ip = ?
		WHERE login_id = ?
	`
	_, err := r.db.Exec(query, user.RecentConnDate, user.ClientIP, user.LoginID)
	if err != nil {
		return fmt.Errorf("로그인 성공 처리 실패: %w", err)
	}
	return nil
}

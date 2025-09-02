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
	_, err := r.db.Exec(query, user.LoginId, user.Passwd, user.EmpName, user.DptName, user.OfficeTel, user.MobileTel, user.RecentConnDate, user.DeleteDate, user.PasswdUpdateDate, user.PwFailCount, user.ClientIp, user.PwRef, user.RegEmpId, user.RegDate, user.UpdEmpId, user.UpdDate)
	if err != nil {
		if strings.Contains(err.Error(), "Duplicate entry") {
			return fmt.Errorf("이미 존재하는 사용자 Id입니다")
		}
		return fmt.Errorf("사용자 등록 실패: %w", err)
	}
	return nil
}

func (r *UserRepository) SelectUserAccountAll() ([]*model.UserAccount, error) {
	const query = `
		SELECT login_id, 
		       IFNULL(passwd, '') as passwd,
		       IFNULL(emp_name, '') as emp_name, 
		       IFNULL(dpt_name, '') as dpt_name, 
		       IFNULL(office_tel, '') as office_tel, 
		       IFNULL(mobile_tel, '') as mobile_tel,
		       recent_conn_date, 
		       delete_date, 
		       passwd_update_date, 
		       IFNULL(pw_fail_count, 0) as pw_fail_count, 
		       IFNULL(client_ip, '') as client_ip, 
		       IFNULL(pw_ref, '') as pw_ref, 
		       IFNULL(reg_emp_id, '') as reg_emp_id, 
		       reg_date, 
		       IFNULL(upd_emp_id, '') as upd_emp_id, 
		       upd_date
		FROM user_account
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("사용자 목록 조회 실패: %w", err)
	}
	defer rows.Close()

	var users []*model.UserAccount
	for rows.Next() {
		var user model.UserAccount

		if err := rows.Scan(
			&user.LoginId,
			&user.Passwd,
			&user.EmpName,
			&user.DptName,
			&user.OfficeTel,
			&user.MobileTel,
			&user.RecentConnDate,
			&user.DeleteDate,
			&user.PasswdUpdateDate,
			&user.PwFailCount,
			&user.ClientIp,
			&user.PwRef,
			&user.RegEmpId,
			&user.RegDate,
			&user.UpdEmpId,
			&user.UpdDate,
		); err != nil {
			return nil, fmt.Errorf("사용자 데이터 스캔 실패: %w", err)
		}

		users = append(users, &user)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("사용자 목록 조회 중 오류 발생: %w", err)
	}

	return users, nil
}

func (r *UserRepository) SelectUserAccountById(id string) (*model.UserAccount, error) {
	var user model.UserAccount

	const query = `
		SELECT login_id, 
		       IFNULL(passwd, '') as passwd,
		       IFNULL(emp_name, '') as emp_name, 
		       IFNULL(dpt_name, '') as dpt_name, 
		       IFNULL(office_tel, '') as office_tel, 
		       IFNULL(mobile_tel, '') as mobile_tel,
		       recent_conn_date, 
		       delete_date, 
		       passwd_update_date, 
		       IFNULL(pw_fail_count, 0) as pw_fail_count, 
		       IFNULL(client_ip, '') as client_ip, 
		       IFNULL(pw_ref, '') as pw_ref, 
		       IFNULL(reg_emp_id, '') as reg_emp_id, 
		       reg_date, 
		       IFNULL(upd_emp_id, '') as upd_emp_id, 
		       upd_date
		FROM user_account
		WHERE login_id = ?
	`

	err := r.db.QueryRow(query, id).Scan(
		&user.LoginId, &user.Passwd, &user.EmpName, &user.DptName, &user.OfficeTel, &user.MobileTel,
		&user.RecentConnDate, &user.DeleteDate, &user.PasswdUpdateDate, &user.PwFailCount,
		&user.ClientIp, &user.PwRef, &user.RegEmpId, &user.RegDate, &user.UpdEmpId, &user.UpdDate,
	)

	if err != nil {
		return nil, fmt.Errorf("사용자 조회 실패: %w", err)
	}
	return &user, nil
}

func (r *UserRepository) UpdateUserAccount(user *model.UserAccount) error {

	const query = `
		UPDATE user_account
		SET passwd = ?, emp_name = ?, dpt_name = ?, office_tel = ?, mobile_tel = ?, 
		recent_conn_date = ?, delete_date = ?, passwd_update_date = ?, pw_fail_count = ?,
		client_ip = ?, pw_ref = ?, reg_emp_id = ?, reg_date = ?, upd_emp_id = ?, upd_date = ?
		WHERE login_id = ?
	`

	_, err := r.db.Exec(query, user.Passwd, user.EmpName, user.DptName, user.OfficeTel, user.MobileTel, user.RecentConnDate, user.DeleteDate, user.PasswdUpdateDate, user.PwFailCount, user.ClientIp, user.PwRef, user.RegEmpId, user.RegDate, user.UpdEmpId, user.UpdDate, user.LoginId)

	if err != nil {
		return fmt.Errorf("사용자 수정 실패: %w", err)
	}
	return nil
}

func (r *UserRepository) UpdateUserAccountLoginFailureById(loginId string) error {
	const query = `
		UPDATE user_account
		SET pw_fail_count = pw_fail_count + 1
		WHERE login_id = ?
	`
	_, err := r.db.Exec(query, loginId)
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
	_, err := r.db.Exec(query, user.RecentConnDate, user.ClientIp, user.LoginId)
	if err != nil {
		return fmt.Errorf("로그인 성공 처리 실패: %w", err)
	}
	return nil
}

func (r *UserRepository) DeleteUserAccountById(userId string) error {
	const query = `
		DELETE FROM user_account
		WHERE login_id = ?
	`
	_, err := r.db.Exec(query, userId)
	if err != nil {
		return fmt.Errorf("사용자 삭제 실패: %w", err)
	}
	return nil
}

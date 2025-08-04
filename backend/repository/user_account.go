package repository

import (
	"backend/db"
	"database/sql"
	"errors"
	"time"
)

type UserAccount struct {
	ID               string
	Passwd           string
	EmpName          string
	DeptName         string
	OfficeTel        string
	MobileTel        string
	RecentConnDate   *time.Time
	DeleteDate       *time.Time
	PasswdUpdateDate *time.Time
	PwFailCount      int
	IsLongUnused     string
	IsExternal       string
	ClientIP         string
	PwRef            string
	RegEmpID         string
	RegDate          *time.Time
	UpdEmpID         string
	UpdDate          *time.Time
}

var ErrUserNotFound = errors.New("사용자를 찾을 수 없습니다")

func GetUserByID(id string) (*UserAccount, error) {
	var user UserAccount

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

	err := db.GetDatabase().QueryRow(query, id).Scan(
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

	if err == sql.ErrNoRows {
		return nil, ErrUserNotFound
	} else if err != nil {
		return nil, err
	}
	return &user, nil
}

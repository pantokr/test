package repository

import (
	"backend/db"
	"database/sql"
	"errors"
)

type User struct {
	ID        string
	Passwd    string
	EmpName   string
	DeptName  string
	OfficeTel string
	MobileTel string
}

var ErrUserNotFound = errors.New("사용자를 찾을 수 없습니다")

func GetUserByID(id string) (*User, error) {
	var user User
	query := `SELECT login_id, passwd, emp_name, dept_name, office_tel, mobile_tel
			  FROM user_account WHERE login_id = ?`

	err := db.GetDatabase().QueryRow(query, id).Scan(
		&user.ID,
		&user.Passwd,
		&user.EmpName,
		&user.DeptName,
		&user.OfficeTel,
		&user.MobileTel,
	)
	if err == sql.ErrNoRows {
		return nil, ErrUserNotFound
	} else if err != nil {
		return nil, err
	}
	return &user, nil
}

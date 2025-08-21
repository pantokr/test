package service

import (
	"errors"
	"fmt"
	"lms/internal/handler/dto/request"
	"lms/internal/model"
	repositoryInterfaces "lms/internal/repository/interfaces"
	serviceInterfaces "lms/internal/service/interfaces"
	"lms/internal/util"
)

type UserService struct {
	userRepo repositoryInterfaces.UserRepositoryInterface
}

func InitUserService(userRepo repositoryInterfaces.UserRepositoryInterface) serviceInterfaces.UserServiceInterface {
	return &UserService{userRepo: userRepo}
}

func (s *UserService) RegisterUser(registerReq request.UserRegistrationRequest) error {
	// 사용자 등록 로직
	userAccount, err := s.userRepo.SelectUserAccountByID(registerReq.LoginID)
	if userAccount != nil || err != nil {
		// 이미 존재하는 사용자
		if err == nil {
			fmt.Printf("이미 존재하는 사용자입니다: %s\n", registerReq.LoginID)
		}
		return errors.New("이미 존재하는 사용자입니다")
	}

	salt, err := util.GenerateSalt(8)
	if err != nil {
		return err
	}

	if err := s.userRepo.InsertUserAccount(&model.UserAccount{
		LoginID:          registerReq.LoginID,
		Passwd:           util.HashPassword(registerReq.Passwd, salt),
		EmpName:          registerReq.EmpName,
		DptName:          registerReq.DptName,
		OfficeTel:        registerReq.OfficeTel,
		MobileTel:        registerReq.MobileTel,
		RecentConnDate:   nil,
		DeleteDate:       nil,
		PasswdUpdateDate: nil,
		PwFailCount:      0,
		ClientIP:         "",
		PwRef:            salt,
		RegEmpID:         registerReq.RegEmpID,
		RegDate:          util.NowPtr(),
		UpdEmpID:         "",
		UpdDate:          nil,
	}); err != nil {
		return err
	}

	return nil
}

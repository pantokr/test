package service

import (
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
	salt, err := util.GenerateSalt(4)
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

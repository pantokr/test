package service

import (
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
	salt, err := util.GenerateSalt(4)
	if err != nil {
		return err
	}

	if err := s.userRepo.InsertUserAccount(&model.UserAccount{
		LoginID:          registerReq.LoginID,
		Passwd:           util.HashPassword(registerReq.LoginID, salt),
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

func (s *UserService) UpdateUser(updateReq request.UserUpdateRequest) error {
	userAccount, err := s.userRepo.SelectUserAccountByID(updateReq.LoginID)
	if err != nil {
		return err
	}

	if !util.CheckPassword(updateReq.OldPasswd, userAccount.PwRef, userAccount.Passwd) {
		return fmt.Errorf("기존 비밀번호가 일치하지 않습니다")
	}

	newPasswd := userAccount.Passwd
	newSalt := userAccount.PwRef

	if updateReq.NewPasswd != "" {
		newSalt, err = util.GenerateSalt(4)
		if err != nil {
			return err
		}
		newPasswd = util.HashPassword(updateReq.NewPasswd, newSalt)
	}

	if err := s.userRepo.UpdateUserAccount(&model.UserAccount{
		LoginID:          updateReq.LoginID,
		Passwd:           newPasswd,
		EmpName:          updateReq.EmpName,
		DptName:          updateReq.DptName,
		OfficeTel:        updateReq.OfficeTel,
		MobileTel:        updateReq.MobileTel,
		RecentConnDate:   nil,
		DeleteDate:       nil,
		PasswdUpdateDate: util.NowPtr(),
		PwFailCount:      0,
		ClientIP:         "",
		PwRef:            newSalt,
		RegEmpID:         "",
		RegDate:          nil,
		UpdEmpID:         updateReq.UpdateEmpID,
		UpdDate:          util.NowPtr(),
	}); err != nil {
		return err
	}

	return nil
}

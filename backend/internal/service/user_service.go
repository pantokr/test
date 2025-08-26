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

	// if !util.CheckPassword(updateReq.OldPasswd, userAccount.PwRef, userAccount.Passwd) {
	// 	return fmt.Errorf("기존 비밀번호가 일치하지 않습니다")
	// }

	// newPasswd := userAccount.Passwd
	// newSalt := userAccount.PwRef

	// if updateReq.NewPasswd != "" {
	// 	newSalt, err = util.GenerateSalt(4)
	// 	if err != nil {
	// 		return err
	// 	}
	// 	newPasswd = util.HashPassword(updateReq.NewPasswd, newSalt)
	// }

	if err := s.userRepo.UpdateUserAccount(&model.UserAccount{
		LoginID:          updateReq.LoginID,
		Passwd:           userAccount.Passwd, // 비밀번호는 변경하지 않음
		EmpName:          updateReq.EmpName,
		DptName:          updateReq.DptName,
		OfficeTel:        updateReq.OfficeTel,
		MobileTel:        updateReq.MobileTel,
		RecentConnDate:   userAccount.RecentConnDate, // 최근 접속일은 변경하지 않음
		DeleteDate:       userAccount.DeleteDate,     // 삭제일은 변경하지 않음
		PasswdUpdateDate: util.NowPtr(),
		PwFailCount:      userAccount.PwFailCount, // 비밀번호 실패 횟수는 변경하지 않음
		ClientIP:         userAccount.ClientIP,    // 클라이언트 IP는 변경하지 않음
		PwRef:            userAccount.PwRef,       // 비밀번호 참조는 변경하지 않음
		RegEmpID:         userAccount.RegEmpID,    // 등록자 ID는 변경하지 않음
		RegDate:          userAccount.RegDate,     // 등록일은 변경하지 않음
		UpdEmpID:         updateReq.UpdateEmpID,
		UpdDate:          util.NowPtr(),
	}); err != nil {
		return err
	}

	return nil
}

func (s *UserService) UpdatePassword(updateReq request.PasswordUpdateRequest) error {
	userAccount, err := s.userRepo.SelectUserAccountByID(updateReq.LoginID)
	if err != nil {
		return err
	}

	if !util.CheckPassword(updateReq.Passwd, userAccount.PwRef, userAccount.Passwd) {
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
		EmpName:          userAccount.EmpName,
		DptName:          userAccount.DptName,
		OfficeTel:        userAccount.OfficeTel,
		MobileTel:        userAccount.MobileTel,
		RecentConnDate:   userAccount.RecentConnDate,
		DeleteDate:       userAccount.DeleteDate,
		PasswdUpdateDate: util.NowPtr(),
		PwFailCount:      userAccount.PwFailCount,
		ClientIP:         userAccount.ClientIP,
		PwRef:            newSalt,
		RegEmpID:         userAccount.RegEmpID,
		RegDate:          userAccount.RegDate,
		UpdEmpID:         userAccount.UpdEmpID,
		UpdDate:          util.NowPtr(),
	}); err != nil {
		return err
	}

	return nil
}

func (s *UserService) VerifyPassword(verifyReq request.Credentials) error {
	userAccount, err := s.userRepo.SelectUserAccountByID(verifyReq.LoginID)
	if err != nil {
		return err
	}

	if !util.CheckPassword(verifyReq.Passwd, userAccount.PwRef, userAccount.Passwd) {
		return fmt.Errorf("비밀번호가 일치하지 않습니다")
	}

	return nil
}

func (s *UserService) GetAllUsers() ([]*model.UserAccount, error) {
	return s.userRepo.SelectUserAccountAll()
}

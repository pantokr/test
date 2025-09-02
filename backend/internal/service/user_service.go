package service

import (
	"fmt"
	"lms/internal/handler/dto/request"
	"lms/internal/handler/dto/response"
	"lms/internal/model"
	repositoryInterfaces "lms/internal/repository/interfaces"
	serviceInterfaces "lms/internal/service/interfaces"
	"lms/internal/util"
	"log"
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
		LoginId:          registerReq.LoginId,
		Passwd:           util.HashPassword(registerReq.LoginId, salt),
		EmpName:          registerReq.EmpName,
		DptName:          registerReq.DptName,
		OfficeTel:        registerReq.OfficeTel,
		MobileTel:        registerReq.MobileTel,
		RecentConnDate:   nil,
		DeleteDate:       nil,
		PasswdUpdateDate: nil,
		PwFailCount:      0,
		ClientIp:         "",
		PwRef:            salt,
		RegEmpId:         registerReq.RegEmpId,
		RegDate:          util.NowPtr(),
		UpdEmpId:         "",
		UpdDate:          nil,
	}); err != nil {
		return err
	}

	return nil
}

func (s *UserService) UpdateUser(updateReq request.UserUpdateRequest) error {
	userAccount, err := s.userRepo.SelectUserAccountById(updateReq.LoginId)
	if err != nil {
		return err
	}

	if err := s.userRepo.UpdateUserAccount(&model.UserAccount{
		LoginId:          updateReq.LoginId,
		Passwd:           userAccount.Passwd, // 비밀번호는 변경하지 않음
		EmpName:          updateReq.EmpName,
		DptName:          updateReq.DptName,
		OfficeTel:        updateReq.OfficeTel,
		MobileTel:        updateReq.MobileTel,
		RecentConnDate:   userAccount.RecentConnDate, // 최근 접속일은 변경하지 않음
		DeleteDate:       userAccount.DeleteDate,     // 삭제일은 변경하지 않음
		PasswdUpdateDate: util.NowPtr(),
		PwFailCount:      userAccount.PwFailCount, // 비밀번호 실패 횟수는 변경하지 않음
		ClientIp:         userAccount.ClientIp,    // 클라이언트 Ip는 변경하지 않음
		PwRef:            userAccount.PwRef,       // 비밀번호 참조는 변경하지 않음
		RegEmpId:         userAccount.RegEmpId,    // 등록자 Id는 변경하지 않음
		RegDate:          userAccount.RegDate,     // 등록일은 변경하지 않음
		UpdEmpId:         updateReq.UpdateEmpId,
		UpdDate:          util.NowPtr(),
	}); err != nil {
		return err
	}

	return nil
}

func (s *UserService) DeleteUser(deleteReq request.UserDeleteRequest) error {
	log.Printf("DeleteUser: %v", deleteReq.DeleteEmpId)
	for _, id := range deleteReq.DeleteEmpId {
		if err := s.userRepo.DeleteUserAccountById(id); err != nil {
			return err
		}
		log.Printf("사용자 삭제 성공: %s", id)
	}
	return nil
}

func (s *UserService) UpdatePassword(updateReq request.PasswordUpdateRequest) error {
	userAccount, err := s.userRepo.SelectUserAccountById(updateReq.LoginId)
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
		LoginId:          updateReq.LoginId,
		Passwd:           newPasswd,
		EmpName:          userAccount.EmpName,
		DptName:          userAccount.DptName,
		OfficeTel:        userAccount.OfficeTel,
		MobileTel:        userAccount.MobileTel,
		RecentConnDate:   userAccount.RecentConnDate,
		DeleteDate:       userAccount.DeleteDate,
		PasswdUpdateDate: util.NowPtr(),
		PwFailCount:      userAccount.PwFailCount,
		ClientIp:         userAccount.ClientIp,
		PwRef:            newSalt,
		RegEmpId:         userAccount.RegEmpId,
		RegDate:          userAccount.RegDate,
		UpdEmpId:         userAccount.UpdEmpId,
		UpdDate:          util.NowPtr(),
	}); err != nil {
		return err
	}

	return nil
}

func (s *UserService) VerifyPassword(verifyReq request.Credentials) error {
	log.Printf("VerifyPassword: %s, %s", verifyReq.LoginId, verifyReq.Passwd)
	userAccount, err := s.userRepo.SelectUserAccountById(verifyReq.LoginId)
	if err != nil {
		return err
	}

	if !util.CheckPassword(verifyReq.Passwd, userAccount.PwRef, userAccount.Passwd) {
		return fmt.Errorf("비밀번호가 일치하지 않습니다")
	}

	return nil
}

func (s *UserService) GetAllUsers() ([]*response.UserListResponse, error) {
	users, err := s.userRepo.SelectUserAccountAll()
	if err != nil {
		return nil, fmt.Errorf("사용자 목록 조회 중 오류 발생: %w", err)
	}

	var userListResponse []*response.UserListResponse
	for _, user := range users {
		userListResponse = append(userListResponse, response.NewUserList(user))
	}

	return userListResponse, nil
}

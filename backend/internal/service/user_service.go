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
	userRepo  repositoryInterfaces.UserRepositoryInterface
	auditRepo repositoryInterfaces.AuditRepositoryInterface
}

func InitUserService(userRepo repositoryInterfaces.UserRepositoryInterface, auditRepo repositoryInterfaces.AuditRepositoryInterface) serviceInterfaces.UserServiceInterface {
	return &UserService{userRepo: userRepo, auditRepo: auditRepo}
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
		PasswdUpdateDate: util.NowPtr(),
		PwFailCount:      0,
		ClientIp:         "",
		PwRef:            salt,
		RegEmpId:         registerReq.RegEmpId,
		RegDate:          util.NowPtr(),
		UpdEmpId:         registerReq.RegEmpId,
		UpdDate:          util.NowPtr(),
		Permission:       registerReq.Permission,
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
		Permission:       updateReq.Permission,
	}); err != nil {
		return err
	}

	return nil
}

func (s *UserService) DeleteUser(deleteReq request.UserDeleteRequest) error {
	for _, id := range deleteReq.DeleteEmpId {
		userAccount, err := s.userRepo.SelectUserAccountById(id)
		if err != nil {
			return err
		}
		userAccount.DeleteDate = util.NowPtr()

		if err := s.userRepo.UpdateUserAccount(userAccount); err != nil {
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

	if util.CheckPassword(updateReq.NewPasswd, userAccount.PwRef, userAccount.Passwd) {
		return fmt.Errorf("새 비밀번호가 기존 비밀번호와 일치합니다")
	}

	newSalt, err := util.GenerateSalt(4)
	if err != nil {
		return err
	}
	newPasswd := util.HashPassword(updateReq.NewPasswd, newSalt)

	userAccount.Passwd = newPasswd
	userAccount.PwRef = newSalt
	userAccount.PasswdUpdateDate = util.NowPtr()

	if err := s.userRepo.UpdateUserAccount(userAccount); err != nil {
		return err
	}

	return nil
}

func (s *UserService) ResetPassword(resetReq request.PasswordResetRequest) error {

	userAccount, err := s.userRepo.SelectUserAccountById(resetReq.LoginId)
	if err != nil {
		return err
	}

	newSalt, err := util.GenerateSalt(4)
	if err != nil {
		return err
	}
	newPasswd := util.HashPassword(resetReq.LoginId, newSalt)

	userAccount.Passwd = newPasswd
	userAccount.PwRef = newSalt

	if err := s.userRepo.UpdateUserAccount(userAccount); err != nil {
		return err
	}

	if err := s.auditRepo.InsertLoginResetHistory(&model.LoginResetHistory{
		LoginId:     resetReq.LoginId,
		ResetTime:   util.NowPtr(),
		ResetCode:   resetReq.ResetCode,
		ResetId:     resetReq.ResetEmpId,
		ResetReason: resetReq.ResetReason,
		PrevLoginIp: userAccount.ClientIp,
	}); err != nil {
		return err
	}

	return nil
}

func (s *UserService) VerifyPassword(verifyReq request.Credentials) error {
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

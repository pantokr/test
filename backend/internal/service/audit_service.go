package service

import (
	"fmt"
	"lms/internal/handler/dto/response"
	repositoryInterfaces "lms/internal/repository/interfaces"
	serviceInterfaces "lms/internal/service/interfaces"
	"lms/internal/util"
)

type AuditService struct {
	auditRepo repositoryInterfaces.AuditRepositoryInterface
	userRepo  repositoryInterfaces.UserRepositoryInterface
}

func InitAuditService(auditRepo repositoryInterfaces.AuditRepositoryInterface, userRepo repositoryInterfaces.UserRepositoryInterface) serviceInterfaces.AuditServiceInterface {
	return &AuditService{auditRepo: auditRepo, userRepo: userRepo}
}

// func (s *AuditService) RecordLoginFailure(code, loginID, clientIP, serverIP string) error {
// 	if err := s.auditRepo.InsertLoginFailureHistory(code, loginID, clientIP, serverIP); err != nil {
// 		return err
// 	}
// 	if err := s.userRepo.UpdateUserAccountLoginFailure(loginID); err != nil {
// 		return err
// 	}
// 	return nil
// }

// func (s *AuditService) RecordLoginSuccess(loginID, clientIP, serverIP string) error {
// 	if err := s.auditRepo.InsertLoginHistory(loginID, clientIP, serverIP); err != nil {
// 		return fmt.Errorf("로그인 성공 기록 실패: %w", err)
// 	}
// 	if err := s.userRepo.UpdateUserAccountLoginSuccess(loginID); err != nil {
// 		return fmt.Errorf("로그인 성공 처리 실패: %w", err)
// 	}
// 	return nil
// }

func (s *AuditService) GetLoginHistoryAll() ([]response.LoginHistoryItem, error) {
	histories, err := s.auditRepo.SelectLoginHistoryAll()
	if err != nil {
		return nil, err
	}
	items := make([]response.LoginHistoryItem, 0, len(histories))
	for _, h := range histories {
		item := response.LoginHistoryItem{
			LoginID:    h.LoginID,
			EmpName:    h.EmpName,
			LoginTime:  util.FormatDateTime(h.LoginTime),
			LogoutTime: util.FormatDateTime(h.LogoutTime),
			IsExternal: h.IsExternal,
			ClientIP:   h.ClientIP,
			ServerIP:   h.ServerIP,
		}
		items = append(items, item)
	}

	return items, nil
}

func (s *AuditService) GetLoginFailureHistoryAll() ([]response.LoginFailureHistoryResponse, error) {
	// data, err := s.auditRepo.SelectLoginFailureHistoryAll()
	// if err != nil {
	// 	return nil, fmt.Errorf("로그인 실패 이력 조회 실패: %w", err)
	// }
	// var responses []response.LoginFailureHistoryResponse
	// for _, fail := range data {
	// 	var response response.LoginFailureHistoryResponse
	// 	responses = append(responses, response)
	// }

	return nil, fmt.Errorf("로그인 실패 이력 조회는 아직 구현되지 않았습니다")
}

func (s *AuditService) GetLoginResetHistoryAll() ([]response.LoginResetResponse, error) {
	data, err := s.auditRepo.SelectLoginResetHistoryAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 리셋 이력 조회 실패: %w", err)
	}
	return data, nil
}

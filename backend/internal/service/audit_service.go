package service

import (
	"fmt"
	"lms/internal/handler/dto/response"
	repositoryInterfaces "lms/internal/repository/interfaces"
	serviceInterfaces "lms/internal/service/interfaces"
)

type AuditService struct {
	auditRepo repositoryInterfaces.AuditRepositoryInterface
}

func InitAuditService(auditRepo repositoryInterfaces.AuditRepositoryInterface) serviceInterfaces.AuditServiceInterface {
	return &AuditService{auditRepo: auditRepo}
}

func (s *AuditService) FailLogin(code, loginID, clientIP, serverIP string) {
	s.auditRepo.InsertLoginFailHistory(code, loginID, clientIP, serverIP)
	s.auditRepo.UpdateUserAccountLoginFail(loginID)
}

func (s *AuditService) RecordLoginSuccess(loginID, clientIP, serverIP string) error {
	if err := s.auditRepo.InsertLoginHistory(loginID, clientIP, serverIP); err != nil {
		return fmt.Errorf("로그인 성공 기록 실패: %w", err)
	}
	if err := s.auditRepo.UpdateUserAccountLoginSuccess(loginID); err != nil {
		return fmt.Errorf("로그인 성공 처리 실패: %w", err)
	}
	return nil
}

func (s *AuditService) GetLoginHistoryAll() ([]response.LoginHistoryResponse, error) {
	data, err := s.auditRepo.SelectLoginHistoryAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 이력 조회 실패: %w", err)
	}
	var responses []response.LoginHistoryResponse
	for _, login := range data {
		var response response.LoginHistoryResponse
		response.LoginHistoryResponseFromModel(login)
		responses = append(responses, response)
	}

	return responses, nil
}

func (s *AuditService) GetLoginFailHistoryAll() ([]response.LoginFailResponse, error) {
	data, err := s.auditRepo.SelectLoginFailHistoryAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 실패 이력 조회 실패: %w", err)
	}
	return data, nil
}

func (s *AuditService) GetLoginResetHistoryAll() ([]response.LoginResetResponse, error) {
	data, err := s.auditRepo.SelectLoginResetHistoryAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 리셋 이력 조회 실패: %w", err)
	}
	return data, nil
}

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

func (s *AuditService) GetLoginHistoryAll() ([]response.LoginHistoryItem, error) {
	histories, err := s.auditRepo.SelectLoginHistoryAll()
	if err != nil {
		return nil, err
	}
	items := make([]response.LoginHistoryItem, 0, len(histories))
	for _, h := range histories {
		item := response.LoginHistoryItem{
			LoginId:    h.LoginId,
			EmpName:    h.EmpName,
			LoginTime:  util.FormatDateTime(h.LoginTime),
			LogoutTime: util.FormatDateTime(h.LogoutTime),
			IsExternal: h.IsExternal,
			ClientIp:   h.ClientIp,
			ServerIp:   h.ServerIp,
		}
		items = append(items, item)
	}

	return items, nil
}

func (s *AuditService) GetLoginFailureHistoryAll() ([]response.LoginFailureHistoryResponse, error) {
	failures, err := s.auditRepo.SelectLoginFailureHistoryAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 실패 이력 조회 실패: %w", err)
	}

	// 실패 코드 매핑
	failCodeMap := map[string]string{
		"1": "비밀번호 오류",
		"2": "오류 5회 초과",
		"3": "비밀번호 만료",
		"4": "Ip 오류",
		"5": "장기 미사용",
		"6": "접속 권한 없음",
		"7": "기타",
	}

	items := make([]response.LoginFailureHistoryResponse, 0, len(failures))
	for _, fail := range failures {
		var response response.LoginFailureHistoryResponse
		{
			response.LoginId = fail.LoginId
			response.LoginTime = util.FormatDateTime(fail.LoginTime)

			// 실패 코드를 설명으로 변환
			if description, exists := failCodeMap[fail.FailCode]; exists {
				response.FailCode = description
			} else {
				response.FailCode = fail.FailCode // 알 수 없는 코드는 원본 반환
			}

			response.ClientIp = fail.ClientIp
			response.ServerIp = fail.ServerIp
		}
		items = append(items, response)
	}

	return items, nil
}

func (s *AuditService) GetLoginResetHistoryAll() ([]response.LoginResetResponse, error) {
	resets, err := s.auditRepo.SelectLoginResetHistoryAll()
	if err != nil {
		return nil, fmt.Errorf("로그인 리셋 이력 조회 실패: %w", err)
	}

	items := make([]response.LoginResetResponse, 0, len(resets))
	for _, reset := range resets {
		var response response.LoginResetResponse
		{
			response.ResetTime = util.FormatDateTime(reset.ResetTime)
			response.ResetCode = reset.ResetCode
			response.LoginId = reset.LoginId
			response.ResetId = reset.ResetId
			response.ResetReason = reset.ResetReason
			response.PrevLoginIp = reset.PrevLoginIp
		}
		items = append(items, response)
	}

	return items, nil
}

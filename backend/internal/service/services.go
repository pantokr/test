// internal/service/services.go
package service

import (
	"lms/internal/repository"
	serviceInterafaces "lms/internal/service/interfaces"
)

type Services struct {
	Auth  serviceInterafaces.AuthServiceInterface
	Audit serviceInterafaces.AuditServiceInterface
	User  serviceInterafaces.UserServiceInterface
}

func NewServices(repos *repository.Repositories) *Services {
	return &Services{
		Auth:  InitAuthService(repos.User, repos.Audit),
		Audit: InitAuditService(repos.Audit, repos.User),
		User:  InitUserService(repos.User),
	}
}

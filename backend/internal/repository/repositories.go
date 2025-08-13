package repository

import (
	"lms/internal/repository/interfaces"
	"lms/pkg/database"
)

type Repositories struct {
	User  interfaces.UserRepositoryInterface
	Audit interfaces.AuditRepositoryInterface
}

func NewRepositories(db *database.DB) *Repositories {
	return &Repositories{
		User:  InitUserRepository(db),
		Audit: InitAuditRepository(db),
	}
}

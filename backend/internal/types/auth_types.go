// internal/service/types/auth_types.go
package types

import "lms/internal/model"

type LoginResult struct {
	Success   bool
	User      *model.UserAccount
	SessionId int64
	Code      string
	Message   string
}

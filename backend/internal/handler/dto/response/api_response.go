package response

// APIResponse는 모든 응답에 공통으로 사용되는 기본 구조체입니다.

// NewResponse는 선택적으로 message와 data를 포함할 수 있는 응답을 생성합니다.
// func NewResponse[T any](success bool, message string, data T) APIResponse {
// 	resp := APIResponse{
// 		Success: success,
// 	}

// 	if message != "" {
// 		resp.Message = message
// 	}

// 	resp.Data = data

// 	return resp
// }

package util

import "time"

func FormatDateTime(t *time.Time) string {
	if t == nil {
		return ""
	}
	return t.Format("2006-01-02 15:04:05")
}

// utils/time.go
func TimePtr(t time.Time) *time.Time {
	return &t
}

func NowPtr() *time.Time {
	return TimePtr(time.Now())
}

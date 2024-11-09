package services

import "cash/backend/models/base"

type Service struct {
	base.Base
	Name        string `json:"name"`
	Description string `json:"description"`
}

func New() *Service {
	return &Service{}
}

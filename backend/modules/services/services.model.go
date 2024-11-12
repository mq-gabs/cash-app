package services

import "cash/backend/modules/base"

type Service struct {
	base.Base
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

func New() *Service {
	return &Service{}
}

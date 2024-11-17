package services

import (
	"cash/backend/modules/base"
	"errors"

	"github.com/google/uuid"
)

type Service struct {
	base.Base
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

func New() *Service {
	s := &Service{}

	s.ID = uuid.New()

	return s
}

func (s *Service) Validate() error {
	if s.Name == "" {
		return errors.New("nome não pode estar vazio")
	}

	// if s.Description == "" {
	// 	return errors.New("descrição não pode estar vazia")
	// }

	if s.Price == 0 {
		return errors.New("preço não pode estar vazio")
	}

	return nil
}

func (s *Service) Update(b *ServiceDto) {
	if b.Name != "" {
		s.Name = b.Name
	}

	if b.Description != "" {
		s.Description = b.Description
	}

	if b.Price != 0 {
		s.Price = b.Price
	}
}

package cashier

import (
	"cash/backend/modules/base"
	"cash/backend/modules/users"
	"errors"
	"time"

	"github.com/google/uuid"
)

type Cashier struct {
	base.Base
	OpenAt *time.Time `json:"open_at"`
	ClosedAt *time.Time `json:"closed_at"`
	OpenByID uuid.UUID `json:"open_by_id"`
	OpenBy *users.User `json:"open_by" gorm:"foreignKey:OpenByID;references:ID"`
	ClosedByID uuid.UUID `json:"closed_by_id"`
	ClosedBy *users.User `json:"closed_by" gorm:"foreignKey:ClosedByID;references:ID"`
	StartValue int `json:"start_value"`
	EndValue int `json:"end_value"`
}

func New() *Cashier {
	now := time.Now()

	c := &Cashier{
		OpenAt: &now,
	}

	c.ID = uuid.New()

	return c
}

func (c *Cashier) ValidateOpen() error {
	if c.OpenAt == nil {
		return errors.New("data e hora de abertura do caixa não pode estar vazio")
	}

	if c.OpenBy == nil {
		return errors.New("nenhum usuário vinculado a abertura do caixa")
	}

	if c.StartValue == 0 {
		return errors.New("valor inicial não informado")
	}

	return nil
}

func (c *Cashier) ValidateClose() error {
	if c.ClosedAt == nil {
		return errors.New("data e hora de fechamento do caixa não pode estar vazio")
	}

	if c.ClosedBy == nil {
		return errors.New("nenhum usuário vinculado ao fechamento do caixa")
	}

	if c.EndValue == 0 {
		return errors.New("valor final não informado")
	}

	return nil
}
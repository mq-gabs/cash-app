package otherpayments

import (
	"cash/backend/modules/base"
	"errors"
	"time"

	"github.com/google/uuid"
)

type OtherPayments struct {
	base.Base
	Title       string     `json:"title"`
	Description string     `json:"description"`
	PaidAt      *time.Time `json:"paid_at"`
	Value       int        `json:"value"`
}

func New() *OtherPayments {
	op := &OtherPayments{}

	op.ID = uuid.New()

	return op
}

func (op *OtherPayments) Validate() error {
	if op.Title == "" {
		return errors.New("título não pode estar vazio")
	}

	if op.Value == 0 {
		return errors.New("valor não pode estar vazio")
	}

	if op.PaidAt == nil {
		return errors.New("data do pagamento não pode estar vazio")
	}

	return nil
}

func (op *OtherPayments) Update(b *OthersPaymentsDto) {
	if b.Title != "" {
		op.Title = b.Title
	}

	if b.Description != "" {
		op.Description = b.Description
	}

	if b.Value != 0 {
		op.Value = b.Value
	}

	if b.PaydAt != nil {
		op.PaidAt = b.PaydAt
	}
}

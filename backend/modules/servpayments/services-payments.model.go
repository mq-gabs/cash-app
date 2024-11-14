package servpayments

import (
	"cash/backend/modules/base"
	"cash/backend/modules/services"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
)

type PaymentType string

const (
	CASH         PaymentType = "CASH"
	DEBIT        PaymentType = "DEBIT"
	CREDIT       PaymentType = "CREDIT"
	INSTALLMENTS PaymentType = "INSTALLMENTS"
)

type ServicesPayment struct {
	base.Base
	Value             int                 `json:"value"`
	PaymentType       PaymentType         `json:"payment_type"`
	NumOfInstallments int                 `json:"num_of_installments"`
	PaidAt            *time.Time          `json:"paid_at"`
	Services          []*services.Service `json:"services" gorm:"many2many:services_payments_services"`
}

func New() *ServicesPayment {
	sp := &ServicesPayment{}

	sp.ID = uuid.New()

	return sp
}

func (sp *ServicesPayment) Validate() (error, error) {

	fmt.Println(sp)
	if sp.PaymentType != CASH && sp.PaymentType != DEBIT && sp.PaymentType != CREDIT && sp.PaymentType != INSTALLMENTS {
		return errors.New("tipo de pagamento inválido"), errors.New(string("got: " + sp.PaymentType + ". Valid: 'CASH', 'DEBIT', 'CREDIT', 'INSTALLMENTS'"))
	}

	if sp.PaidAt == nil {
		return errors.New("data do pagamento não pode estar vazia"), nil
	}

	if sp.Services == nil {
		return errors.New("nenhum serviço foi adicionado"), nil
	}

	if sp.Value == 0 {
		return errors.New("valor não pode estar vazio"), nil
	}

	return nil, nil
}

func (sp *ServicesPayment) Update(b *ServicesPaymentDto) {
	if b.PaidAt != nil {
		sp.PaidAt = b.PaidAt
	}

	if b.PaymentType != "" {
		sp.PaymentType = b.PaymentType
	}

	sp.NumOfInstallments = b.NumOfInstallments

	if b.Services != nil {
		var value int
		for _, el := range b.Services {
			value += el.Price
		}
		sp.Value = value
		sp.Services = b.Services
	}
}

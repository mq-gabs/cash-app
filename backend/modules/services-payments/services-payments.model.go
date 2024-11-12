package servicespayments

import (
	"cash/backend/modules/base"
	"cash/backend/modules/services"
	"time"
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
	PaidAt            time.Time           `json:"paid_at"`
	Services          []*services.Service `json:"services" gorm:"many2many:services_payments_services"`
}

func New() *ServicesPayment {
	return &ServicesPayment{}
}

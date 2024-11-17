package employeespayments

import (
	"cash/backend/modules/base"
	"cash/backend/modules/employees"
	"errors"
	"time"

	"github.com/google/uuid"
)

type EmployeesPayment struct {
	base.Base
	Value      int                 `json:"value"`
	PaidAt     *time.Time          `json:"paid_at"`
	EmployeeID uuid.UUID           `json:"employee_id"`
	Employee   *employees.Employee `json:"employee" gorm:"foreignKey:EmployeeID;references:ID"`
}

func New() *EmployeesPayment {
	ep := &EmployeesPayment{}

	ep.ID = uuid.New()

	return ep
}

func (ep *EmployeesPayment) Validate() error {
	if ep.Value == 0 {
		return errors.New("valor não pode estar vazio")
	}

	if ep.PaidAt == nil {
		return errors.New("data do pagamento não pode estar vazia")
	}

	if ep.Employee == nil {
		return errors.New("funcionário não encontrado")
	}

	return nil
}

func (ep *EmployeesPayment) Update(b *EmployeesPaymentsDto) {
	if b.Employee != nil {
		ep.Employee = b.Employee
	}

	if b.Value != 0 {
		ep.Value = b.Value
	}

	if b.PaidAt != nil {
		ep.PaidAt = b.PaidAt
	}
}

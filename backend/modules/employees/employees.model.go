package employees

import (
	"cash/backend/modules/base"
	"errors"

	"github.com/google/uuid"
)

type Employee struct {
	base.Base
	Name string `json:"name"`
	Wage int    `json:"wage"`
	Role string `json:"role"`
}

func New() *Employee {
	e := &Employee{}

	e.ID = uuid.New()

	return e
}

func (e *Employee) Validate() error {

	if e.Name == "" {
		return errors.New("nome não pode estar vazio")
	}
	if e.Role == "" {
		return errors.New("cargo não pode estar vazio")
	}

	if e.Wage == 0 {
		return errors.New("salário não pode estar vazio")
	}

	return nil
}

func (e *Employee) Update(b *EmployeeDto) []*error {

	if b.Name != "" {
		e.Name = b.Name
	}

	if b.Role != "" {
		e.Role = b.Role
	}

	if b.Wage != 0 {
		e.Wage = b.Wage
	}

	return nil
}

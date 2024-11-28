package customers

import (
	"cash/backend/modules/base"
	"errors"
	"time"

	"github.com/google/uuid"
)

type Customer struct {
	base.Base
	Name      string     `json:"name"`
	Contact   string     `json:"contact"`
	Address   string     `json:"address"`
	BirthDate *time.Time `json:"birth_date"`
	Balance   uint       `json:"balance"`
}

func New() *Customer {
	c := &Customer{}

	c.ID = uuid.New()

	return c
}

func (c *Customer) Validate() error {
	if c.Name == "" {
		return errors.New("nome não pode estar vazio")
	}

	if c.Address == "" {
		return errors.New("endereço não pode estar vazio")
	}

	if c.BirthDate == nil {
		return errors.New("data do nascimento não pode estar vazio")
	}

	if c.Contact == "" {
		return errors.New("telefone não pode estar vazio")
	}

	return nil
}

func (c *Customer) Update(b *CustomerDto) {
	if b.Address != "" {
		c.Address = b.Address
	}

	if b.BirthDate != nil {
		c.BirthDate = b.BirthDate
	}

	if b.Contact != "" {
		c.Contact = b.Contact
	}

	if b.Name != "" {
		c.Name = b.Name
	}

	if b.Balance != 0 {
		c.Balance = b.Balance
	}
}

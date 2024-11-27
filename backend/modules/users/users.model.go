package users

import (
	"cash/backend/modules/base"
	"cash/backend/utils"
	"errors"

	"github.com/google/uuid"
)

type Role string

const (
	ADMIN   Role = "ADMIN"
	DEFAULT Role = "DEFAULT"
)

type User struct {
	base.Base
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     Role   `json:"role"`
}

func New() *User {
	u := &User{}

	u.ID = uuid.New()

	return u
}

func (u *User) Validate() error {
	if u.Name == "" {
		return errors.New("nome não pode estar vazio")
	}

	if u.Email == "" {
		return errors.New("email não pode estar vazio")
	}

	if u.Password == "" || len(u.Password) < 6 {
		return errors.New("a senha deve ter no mínimo 6 caracteres")
	}

	if u.Role != ADMIN && u.Role != DEFAULT {
		return errors.New("invalid profile")
	}

	return nil
}

func (u *User) Update(b *UserDto) {
	if b.Name != "" {
		u.Name = b.Name
	}

	if b.Email != "" {
		u.Email = b.Email
	}

	if b.Password != "" {
		u.Password, _ = utils.HashPassword(b.Password)
	}

	if b.Role != "" {
		u.Role = b.Role
	} else {
		u.Role = DEFAULT
	}
}

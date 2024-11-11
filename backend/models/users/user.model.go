package users

import (
	"cash/backend/models/base"
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
	return &User{}
}

package users

import (
	"cash/backend/models/base"
)

type User struct {
	base.Base
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func New() *User {
	return &User{}
}

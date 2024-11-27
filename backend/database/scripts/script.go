package scripts

import (
	"cash/backend/modules/users"

	"github.com/google/uuid"
)

func SetAdminUser() {
	u := &users.User{
		Name:     "Administrador",
		Email:    "admin",
		Password: "$2a$14$vkaENK6oZXFF5dagJ0WB7.Y2Ve9RBNFXUq/hPp9U6jZqsIrQ1lGWi",
		Role:     users.ADMIN,
	}

	u.ID = uuid.New()

	users.DBSave(u)
}

package scripts

import (
	"cash/backend/modules/users"

	"github.com/google/uuid"
)

func SetAdminUser() {
	userToDelete, err := users.DBGetUserByEmail("admin")

	if err == nil {
		users.DBDelete(userToDelete.ID)
	}

	u := &users.User{
		Name:     "Administrador",
		Email:    "admin",
		Password: "$2a$14$vkaENK6oZXFF5dagJ0WB7.Y2Ve9RBNFXUq/hPp9U6jZqsIrQ1lGWi",
		Role:     users.ADMIN,
	}

	u.ID = uuid.New()

	users.DBSave(u)
}

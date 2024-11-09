package migrations

import (
	"cash/backend/database"
	"cash/backend/models/services"
	"cash/backend/models/users"
	"fmt"
)

func Migrate() {
	fmt.Println("Running migrations")

	db := database.Conn()

	if err := db.AutoMigrate(
		&users.User{},
		&services.Service{},
	); err != nil {
		panic("Error while running migrations: " + err.Error())
	}

	fmt.Println("Migrations runned successfully!")
}

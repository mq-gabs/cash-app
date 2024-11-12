package migrations

import (
	"cash/backend/database"
	"cash/backend/modules/services"
	servicespayments "cash/backend/modules/services-payments"
	"cash/backend/modules/users"
	"fmt"
)

func Migrate() {
	fmt.Println("Running migrations")

	db := database.Conn()

	if err := db.AutoMigrate(
		&users.User{},
		&services.Service{},
		&servicespayments.ServicesPayment{},
	); err != nil {
		panic("Error while running migrations: " + err.Error())
	}

	fmt.Println("Migrations runned successfully!")
}

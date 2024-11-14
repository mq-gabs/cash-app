package migrations

import (
	"cash/backend/database"
	"cash/backend/modules/employees"
	"cash/backend/modules/services"
	"cash/backend/modules/servpayments"
	"cash/backend/modules/users"
	"fmt"
)

func Migrate() {
	fmt.Println("Running migrations...")

	db, err := database.Conn()

	if err != nil {
		panic("Cannot connect to database: " + err.Error())
	}

	if err := db.AutoMigrate(
		&users.User{},
		&services.Service{},
		&servpayments.ServicesPayment{},
		&employees.Employee{},
	); err != nil {
		panic("Error while running migrations: " + err.Error())
	}

	fmt.Println("Migrations runned successfully!")
}

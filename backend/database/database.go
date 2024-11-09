package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Conn() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("backend/database/sqlite.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	return db
}

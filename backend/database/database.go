package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Conn() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("db/sqlite.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}

package database

import (
	"database/sql"

	"github.com/google/uuid"
	sqliteGo "github.com/mattn/go-sqlite3"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

const CustomDriverName = "sqlite3_extended"
const File = "db/sqlite.db"

var conn *sql.DB

func SetUUIDForSqlite() {
	sql.Register(CustomDriverName,
		&sqliteGo.SQLiteDriver{
			ConnectHook: func(conn *sqliteGo.SQLiteConn) error {
				err := conn.RegisterFunc(
					"gen_random_uuid",
					func(arguments ...interface{}) (string, error) {
						return uuid.New().String(), nil // Return a string value.
					},
					true,
				)
				return err
			},
		},
	)

	connn, err := sql.Open(CustomDriverName, File)
	if err != nil {
		panic(err)
	}

	conn = connn
}

func Conn() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("db/sqlite.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, nil
}

func Conn2() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Dialector{
		DriverName: CustomDriverName,
		DSN:        File,
		Conn:       conn,
	}, &gorm.Config{
		Logger:                   logger.Default.LogMode(logger.Info),
		SkipDefaultTransaction:   true,
		DisableNestedTransaction: true,
	})
	if err != nil {
		return nil, err
	}

	return db, nil
}

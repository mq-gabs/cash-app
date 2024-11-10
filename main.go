package main

import (
	"cash/backend/database/migrations"
	"cash/server"
	staticserver "cash/static-server"
	"os"
)

func checks() {
	if _, err := os.Stat("db"); err != nil {
		os.Mkdir("db", os.ModePerm)
	}
	if _, err := os.Stat("logs"); err != nil {
		os.Mkdir("logs", os.ModePerm)
	}
	if _, err := os.Stat("static"); err != nil {
		panic("Static source not found")
	}

	if _, err := os.Stat("db/sqlite.db"); err != nil {
		os.WriteFile("db/sqlite.db", nil, os.ModePerm)
		migrations.Migrate()
	}

}

func main() {
	checks()

	params := os.Args[1:]

	if len(params) != 0 {
		if params[0] == "migrate" {
			migrations.Migrate()
			return
		}

		if params[0] == "api" {
			server.Start()
			return
		}
	}

	staticserver.StartStatic(server.Start)
}

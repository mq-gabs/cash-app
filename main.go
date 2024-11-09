package main

import (
	"cash/backend/database/migrations"
	"cash/server"
	staticserver "cash/static-server"
	"os"
)

func main() {
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

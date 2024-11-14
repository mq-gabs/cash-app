package main

import (
	"cash/backend/database/migrations"
	"cash/server"
	staticserver "cash/static-server"
	"os"

	"github.com/pkg/browser"
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

func openBrowser() {
	browser.OpenURL("http://localhost:8889")
}

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

	checks()

	openBrowser()

	staticserver.StartStatic(server.Start)
}

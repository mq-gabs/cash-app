package server

import (
	"cash/backend/routes"
	"io"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setLogs() {
	t := time.Now()

	date := t.Format(time.RFC3339)[0:19]

	f, _ := os.Create("logs/" + date + "_stdout.log")
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
}

func Start() {
	setLogs()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowHeaders:    []string{"*"},
		AllowAllOrigins: true,
	}))

	g := r.Group("/api")
	routes.SetRoutes(g)

	r.Run(":8888")
}

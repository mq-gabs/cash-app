package routes

import (
	"cash/backend/models/services"
	"cash/backend/models/users"

	"github.com/gin-gonic/gin"
)

func SetRoutes(g *gin.RouterGroup) {
	users.SetRoutes(g)
	services.SetRoutes(g)
}

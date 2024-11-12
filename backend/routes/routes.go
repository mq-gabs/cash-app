package routes

import (
	"cash/backend/modules/services"
	servicespayments "cash/backend/modules/services-payments"
	"cash/backend/modules/users"

	"github.com/gin-gonic/gin"
)

func SetRoutes(g *gin.RouterGroup) {
	users.SetRoutes(g)
	services.SetRoutes(g)
	servicespayments.SetRoutes(g)
}

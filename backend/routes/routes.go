package routes

import (
	"cash/backend/modules/employees"
	"cash/backend/modules/otherpayments"
	"cash/backend/modules/services"
	"cash/backend/modules/servpayments"
	"cash/backend/modules/users"

	"github.com/gin-gonic/gin"
)

func SetRoutes(g *gin.RouterGroup) {
	users.SetRoutes(g)
	services.SetRoutes(g)
	servpayments.SetRoutes(g)
	employees.SetRoutes(g)
	otherpayments.SetRoutes(g)
}

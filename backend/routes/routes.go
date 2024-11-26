package routes

import (
	"cash/backend/modules/auth"
	"cash/backend/modules/employees"
	"cash/backend/modules/employeespayments"
	"cash/backend/modules/otherpayments"
	"cash/backend/modules/reports"
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
	employeespayments.SetRoutes(g)
	reports.SetRoutes(g)
	auth.SetRoutes(g)
}

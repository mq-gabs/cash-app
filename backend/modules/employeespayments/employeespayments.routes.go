package employeespayments

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/employees-payments")

	g.Use(utils.JwtAdminAuthMiddleware())

	g.GET("", GetEmployeesPayments)
	g.GET("/:id", GetOneEmployeePayment)
	g.POST("", CreateEmployeePayment)
	g.PATCH("/:id", UpdateEmployeePayment)
	g.DELETE("/:id", DeleteEmployeePayment)
}

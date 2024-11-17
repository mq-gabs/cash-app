package employeespayments

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/employees-payments")

	g.GET("", GetEmployeesPayments)
	g.GET("/:id", GetOneEmployeePayment)
	g.POST("", CreateEmployeePayment)
	g.PATCH("/:id", UpdateEmployeePayment)
	g.DELETE("/:id", DeleteEmployeePayment)
}

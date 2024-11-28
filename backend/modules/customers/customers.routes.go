package customers

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("customers")

	g.POST("", CreateCustomer)
	g.GET("", ListCustomers)
	g.GET("/:id", GetOneCustomer)
	g.PATCH("/:id", UpdateCustomer)
	g.DELETE("/:id", DeleteCustomer)
}

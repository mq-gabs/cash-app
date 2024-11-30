package customers

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("customers")

	g.Use(utils.JwtAuthMiddleware(false))

	g.POST("", CreateCustomer)
	g.GET("", ListCustomers)
	g.GET("/:id", GetOneCustomer)
	g.PATCH("/:id", UpdateCustomer)
	g.DELETE("/:id", DeleteCustomer)
}

package employees

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("employees")

	g.Use(utils.JwtAuthMiddleware(true))

	g.GET("", ListEmployees)
	g.GET("/:id", GetOneEmployee)
	g.POST("", CreateEmployee)
	g.PATCH("/:id", UpdateEmployee)
	g.DELETE("/:id", DeleteEmployee)
}

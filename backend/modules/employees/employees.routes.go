package employees

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("employees")

	g.GET("", ListEmployees)
	g.GET("/:id", GetOneEmployee)
	g.POST("", CreateEmployee)
	g.PATCH("/:id", UpdateEmployee)
	g.DELETE("/:id", DeleteEmployee)
}

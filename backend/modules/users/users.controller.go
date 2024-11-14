package users

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/users")

	g.GET("", FindUsers)
	g.GET("/:id", GetOneUser)
	g.POST("", CreateUser)
	g.PATCH("/:id", UpdateUser)
	g.DELETE("/:id", DeleteUser)
}

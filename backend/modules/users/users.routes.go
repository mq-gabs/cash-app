package users

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/users")

	g.GET("", utils.JwtAuthMiddleware(true), FindUsers)
	g.GET("/:id", utils.JwtAuthMiddleware(false), GetOneUser)
	g.POST("", CreateUser)
	g.PATCH("/:id", utils.JwtAuthMiddleware(false), UpdateUser)
	g.DELETE("/:id", utils.JwtAuthMiddleware(true), DeleteUser)
}

package users

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/users")

	g.GET("", FindUsers)
	g.POST("", CreateUser)
}

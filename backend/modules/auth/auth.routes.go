package auth

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/auth")

	g.POST("", SignIn)
}

package services

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/services")

	g.GET("", FindServices)
	g.POST("", CreateService)
}

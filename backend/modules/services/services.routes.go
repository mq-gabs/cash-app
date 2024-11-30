package services

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/services")

	g.Use(utils.JwtAuthMiddleware(false))

	g.GET("", FindServices)
	g.GET("/:id", GetOneService)
	g.POST("", CreateService)
	g.PATCH("/:id", UpdateService)
	g.DELETE("/:id", DeleteService)
}

package reports

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/reports")

	g.Use(utils.JwtAuthMiddleware())

	g.GET("/month", GenMonthReport)
}

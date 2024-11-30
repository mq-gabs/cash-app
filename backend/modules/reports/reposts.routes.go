package reports

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/reports")

	g.Use(utils.JwtAuthMiddleware(true))

	g.GET("/month", GenMonthReport)
	g.GET("/day", GenDailyReport)
	g.GET("/year", GenYearReport)
}

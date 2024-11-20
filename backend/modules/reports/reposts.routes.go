package reports

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/reports")

	g.GET("/month", GenMonthReport)
}

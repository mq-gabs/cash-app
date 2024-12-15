package cashier

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/cashier")

	g.POST("/open", OpenCashier)
	g.PATCH("/close", CloseCashier)
	g.GET("", GetOpenCashier)
}
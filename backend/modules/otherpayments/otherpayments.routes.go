package otherpayments

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/other-payments")

	g.GET("", ListOtherPayments)
	g.GET("/:id", GetOneOtherPayment)
	g.POST("", CreateOtherPayment)
	g.PATCH("/:id", UpdateOtherPayment)
	g.DELETE("/:id", DeleteOtherPayment)
}

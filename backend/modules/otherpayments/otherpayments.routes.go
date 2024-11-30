package otherpayments

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/other-payments")

	g.Use(utils.JwtAuthMiddleware(false))
	
	g.GET("", ListOtherPayments)
	g.GET("/:id", GetOneOtherPayment)
	g.POST("", CreateOtherPayment)
	g.PATCH("/:id", UpdateOtherPayment)
	g.DELETE("/:id", DeleteOtherPayment)
}

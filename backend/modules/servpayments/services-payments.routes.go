package servpayments

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/service-payments")

	g.GET("", GetServicesPayment)
	g.GET("/:id", GetOneServicePayment)
	g.POST("", CreateServicesPayment)
	g.PATCH("/:id", UpdateServicePayment)
	g.DELETE("/:id", DeleteServicePayment)
}

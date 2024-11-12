package servicespayments

import "github.com/gin-gonic/gin"

func SetRoutes(r *gin.RouterGroup) {
	g := r.Group("/services-payments")

	g.GET("", GetServicesPayment)
	g.POST("", CreateServicesPayment)
}

package utils

import "github.com/gin-gonic/gin"

func Resp(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{
		"message": message,
	})
}

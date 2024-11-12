package utils

import "github.com/gin-gonic/gin"

func Resp(c *gin.Context, code int, message string, args ...string) {
	b := gin.H{
		"message": message,
	}

	if len(args) > 0 {
		b["details"] = args
	}

	c.JSON(code, b)
}

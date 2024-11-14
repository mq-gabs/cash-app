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

func RespErrorBind(c *gin.Context, args ...string) {
	Resp(c, 500, "Erro no servidor!", args...)
}

func RespErrorDB(c *gin.Context, args ...string) {
	Resp(c, 500, "Erro no banco de dados!", args...)
}

func RespNotFound(c *gin.Context, message string, args ...string) {
	Resp(c, 404, message, args...)
}

func RespNotValid(c *gin.Context, err string) {
	Resp(c, 400, "Erro de validação: "+err)
}

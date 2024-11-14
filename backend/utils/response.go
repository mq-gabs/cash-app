package utils

import "github.com/gin-gonic/gin"

func Resp(c *gin.Context, code int, message string, args ...error) {
	b := gin.H{
		"message": message,
	}

	if len(args) > 0 {
		var strErrors = []string{}

		for _, err := range args {
			if err != nil {
				strErrors = append(strErrors, err.Error())
			}
		}

		if len(strErrors) != 0 {
			b["details"] = strErrors
		}
	}

	c.JSON(code, b)
}

func RespErrorBind(c *gin.Context, args ...error) {
	Resp(c, 500, "Erro no servidor!", args...)
}

func RespErrorDB(c *gin.Context, args ...error) {
	Resp(c, 500, "Erro no banco de dados!", args...)
}

func RespNotFound(c *gin.Context, message string, args ...error) {
	Resp(c, 404, message, args...)
}

func RespNotValid(c *gin.Context, mainError error, args ...error) {
	Resp(c, 400, "Erro de validação: "+mainError.Error(), args...)
}

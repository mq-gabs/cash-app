package auth

import (
	"cash/backend/modules/users"
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

type LogigDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func SignIn(c *gin.Context) {
	b := &LogigDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	u, err := users.DBGetUserByEmail(b.Email)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	if !utils.CheckPassword(b.Password, u.Password) {
		utils.Resp(c, 401, "Senha incorreta")
		return
	}

	token, err := utils.GenerateToken(u.ID.String())

	if err != nil {
		utils.Resp(c, 500, "Não foi possível acessar", err)
		return
	}

	c.JSON(200, gin.H{
		"data": gin.H{
			"id":       u.ID,
			"token":    token,
			"is_admin": u.Role == users.ADMIN,
		},
		"message": "Login feito!",
	})
}

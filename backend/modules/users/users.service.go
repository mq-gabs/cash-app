package users

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

type CreateUserDto struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func CreateUser(c *gin.Context) {
	b := &CreateUserDto{}

	if err := c.BindJSON(b); err != nil {
		utils.Resp(c, 500, "Erro do servidor!", err)
		return
	}

	u := New()

	u.Name = b.Name
	u.Email = b.Email
	u.Password = b.Password
	u.Role = Role("DEFAULT")

	err := Save(u)

	if err != nil {
		utils.Resp(c, 500, "Erro no banco de dados!", err)
		return
	}

	utils.Resp(c, 201, "Usuário cadastrado!")
}

func FindUsers(c *gin.Context) {
	users, err := List()

	if err != nil {
		utils.Resp(c, 500, "Erro no banco de dados!", err)
		return
	}

	c.JSON(200, users)
}

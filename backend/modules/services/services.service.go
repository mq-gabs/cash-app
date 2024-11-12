package services

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

type CreateServiceDto struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

func CreateService(c *gin.Context) {
	b := &CreateServiceDto{}

	if err := c.BindJSON(b); err != nil {
		utils.Resp(c, 400, "Erro do servidor!", err.Error())
		return
	}

	s := New()

	s.Name = b.Name
	s.Description = b.Description
	s.Price = b.Price

	err := Save(s)

	if err != nil {
		utils.Resp(c, 500, "Erro no banco de dados!", err.Error())
		return
	}

	utils.Resp(c, 201, "Serviço criado!")
}

func FindServices(c *gin.Context) {
	services, err := List()

	if err != nil {
		utils.Resp(c, 400, "Erro no banco de dados!", err.Error())
		return
	}

	c.JSON(200, services)
}

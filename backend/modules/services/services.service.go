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
		utils.Resp(c, 400, "Erro do servidor!"+err.Error())
		return
	}

	s := New()

	s.Name = b.Name
	s.Description = b.Description
	s.Price = b.Price

	Save(s)

	utils.Resp(c, 201, "Serviço criado!")
}

func FindServices(c *gin.Context) {
	services := List()

	c.JSON(200, services)
}

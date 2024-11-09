package services

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
)

type CreateServiceDto struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func CreateService(c *gin.Context) {
	b := &CreateServiceDto{}

	if err := c.BindJSON(b); err != nil {
		utils.Resp(c, 500, "Erro do servidor!")
		return
	}

	s := New()

	s.Name = b.Name
	s.Description = b.Description

	Save(s)

	utils.Resp(c, 201, "Serviço criado!")
}

func FindServices(c *gin.Context) {
	services := List()

	c.JSON(200, services)
}

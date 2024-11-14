package services

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ServiceDto struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

func CreateService(c *gin.Context) {
	b := &ServiceDto{}

	if err := c.BindJSON(b); err != nil {
		utils.Resp(c, 400, "Erro do servidor!", err)
		return
	}

	s := New()

	s.Update(b)

	if err := s.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	err := DBSave(s)

	if err != nil {
		utils.Resp(c, 500, "Erro no banco de dados!", err)
		return
	}

	utils.Resp(c, 201, "Serviço criado!")
}

func FindServices(c *gin.Context) {
	q := utils.NewQuery()

	if err := c.BindQuery(q); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	services, err := DBList(q)

	if err != nil {
		utils.Resp(c, 400, "Erro no banco de dados!", err)
		return
	}

	c.JSON(200, services)
}

func GetOneService(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	e, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Serviço não encontrado", err)
		return
	}

	c.JSON(200, e)
}

func UpdateService(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	s, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Serviço não encontrado!", err)
		return
	}

	b := &ServiceDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	s.Update(b)

	if err = s.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(s); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Dados atualizados!")
}

func DeleteService(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	if _, err := DBFindOne(id); err != nil {
		utils.RespNotFound(c, "Serviço não encontrado", err)
		return
	}

	if err := DBDelete(id); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Serviço excluído!")
}

package customers

import (
	"cash/backend/utils"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CustomerDto struct {
	Name      string     `json:"name"`
	Contact   string     `json:"contact"`
	Address   string     `json:"address"`
	BirthDate *time.Time `json:"birth_date"`
	Balance   uint       `json:"balance"`
}

func CreateCustomer(c *gin.Context) {
	b := &CustomerDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	ctm := New()

	ctm.Update(b)

	if err := ctm.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(ctm); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Cliente cadastrado!")
}

func ListCustomers(c *gin.Context) {
	q := utils.NewQuery()

	if err := c.BindQuery(q); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	ctms, err := DBList(q)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	c.JSON(200, ctms)
}

func GetOneCustomer(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	ctm, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Cliente não encontrado", err)
		return
	}

	c.JSON(200, ctm)
}

func UpdateCustomer(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	ctm, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Cliente não encontrado!", err)
		return
	}

	b := &CustomerDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	ctm.Update(b)

	if err = ctm.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(ctm); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Dados atualizados!")
}

func DeleteCustomer(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	if _, err := DBFindOne(id); err != nil {
		utils.RespNotFound(c, "Cliente não encontrado", err)
		return
	}

	if err := DBDelete(id); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Cliente excluído!")
}

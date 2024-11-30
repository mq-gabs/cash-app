package otherpayments

import (
	"cash/backend/utils"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type OthersPaymentsDto struct {
	Title       string     `json:"title"`
	Description string     `json:"description"`
	PaydAt      *time.Time `json:"paid_at"`
	Value       int        `json:"value"`
}

func CreateOtherPayment(c *gin.Context) {
	b := &OthersPaymentsDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	op := New()

	op.Update(b)

	if err := op.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(op); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 201, "Gasto cadastrado!")
}

func ListOtherPayments(c *gin.Context) {
	q := utils.NewQuery()

	if err := c.BindQuery(q); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	ops, err := DBList(q)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	c.JSON(200, ops)
}

func GetOneOtherPayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	op, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Gasto não encontrado", err)
		return
	}

	c.JSON(200, op)
}

func UpdateOtherPayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	op, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Gasto não encontrado!", err)
		return
	}

	b := &OthersPaymentsDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	op.Update(b)

	if err = op.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(op); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Dados atualizados!")
}

func DeleteOtherPayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	if _, err := DBFindOne(id); err != nil {
		utils.RespNotFound(c, "Gasto não encontrado", err)
		return
	}

	if err := DBDelete(id); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Gasto excluído!")
}

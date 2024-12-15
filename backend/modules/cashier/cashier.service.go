package cashier

import (
	"cash/backend/modules/users"
	"cash/backend/utils"
	"time"

	"github.com/gin-gonic/gin"
)

func GetOpenCashier(c *gin.Context) {
	cs, _ := DBFindOneOpen()

	c.JSON(200, gin.H{
		"cashier": cs,
	})
}

type OpenCashierDto struct {
	OpenBy *users.User `json:"open_by"`
	StartValue int `json:"start_value"`
}

func OpenCashier(c *gin.Context) {
	css, _ := DBFindOneOpen()

	if css != nil {
		utils.Resp(c, 400, "Erro ao abrir o caixa: um caixa já está aberto")
		return
	}

	b := &OpenCashierDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	cs := New()

	cs.OpenBy = b.OpenBy
	cs.StartValue = b.StartValue

	if err := cs.ValidateOpen(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(cs); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	c.JSON(200, gin.H{
		"message": "Caixa aberto",
		"data": cs,
	})
}

type CloseCashierDto struct {
	ClosedBy *users.User `json:"closed_by"`
	EndValue int `json:"end_value"`	
}

func CloseCashier(c *gin.Context) {
	cs, _ := DBFindOneOpen()

	if cs == nil {
		utils.Resp(c, 400, "Erro ao feixar o caixa: o caixa não está aberto")
		return
	}

	b := &CloseCashierDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	now := time.Now()

	cs.ClosedBy = b.ClosedBy
	cs.EndValue = b.EndValue
	cs.ClosedAt = &now

	if err := cs.ValidateClose(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(cs); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Caixa fechado!")
}
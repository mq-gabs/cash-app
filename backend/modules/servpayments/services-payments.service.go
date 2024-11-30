package servpayments

import (
	"cash/backend/modules/customers"
	"cash/backend/modules/services"
	"cash/backend/utils"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ServicesPaymentDto struct {
	PaymentType       PaymentType         `json:"payment_type"`
	NumOfInstallments int                 `json:"num_of_installments"`
	PaidAt            *time.Time          `json:"paid_at"`
	Services          []*services.Service `json:"services"`
	Customer 					*customers.Customer `json:"customer"`
	Value 				int `json:"value"`
	Observation string `json:"observation"`
}

func CreateServicesPayment(c *gin.Context) {
	b := &ServicesPaymentDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	sp := New()

	sp.Update(b)

	if err, err2 := sp.Validate(); err != nil {
		utils.RespNotValid(c, err, err2)
		return
	}

	if err := DBSave(sp); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 201, "Pagamento registrado!")
}

func GetServicesPayment(c *gin.Context) {
	q := utils.NewQuery()

	if err := c.BindQuery(q); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	sp, err := DBList(q)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	c.JSON(200, sp)
}

func GetOneServicePayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	e, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Pagamento de serviço não encontrado", err)
		return
	}

	c.JSON(200, e)
}

func UpdateServicePayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	s, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Pagamento de serviço não encontrado!", err)
		return
	}

	b := &ServicesPaymentDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	s.Update(b)

	if err, err2 := s.Validate(); err != nil {
		utils.RespNotValid(c, err, err2)
		return
	}

	if err := DBSave(s); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Dados atualizados!")
}

func DeleteServicePayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	if _, err := DBFindOne(id); err != nil {
		utils.RespNotFound(c, "Pagamento de serviço não encontrado", err)
		return
	}

	if err := DBDelete(id); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Pagamento de serviço excluído!")
}

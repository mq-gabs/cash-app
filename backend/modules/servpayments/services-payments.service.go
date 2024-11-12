package servpayments

import (
	"cash/backend/modules/services"
	"cash/backend/utils"
	"time"

	"github.com/gin-gonic/gin"
)

type CreateServicesPaymentDto struct {
	Value             int                 `json:"value"`
	PaymentType       PaymentType         `json:"payment_type"`
	NumOfInstallments int                 `json:"num_of_installments"`
	PaidAt            time.Time           `json:"paid_at"`
	Services          []*services.Service `json:"services"`
}

func CreateServicesPayment(c *gin.Context) {
	b := &CreateServicesPaymentDto{}

	if err := c.BindJSON(b); err != nil {
		utils.Resp(c, 400, "Erro do servidor!", err.Error())
		return
	}

	sp := New()

	sp.Value = b.Value
	sp.PaymentType = b.PaymentType
	sp.NumOfInstallments = b.NumOfInstallments
	sp.PaidAt = b.PaidAt

	err := Save(sp)

	if err != nil {
		utils.Resp(c, 500, "Erro no banco de dados!", err.Error())
		return
	}

	utils.Resp(c, 201, "Pagamento registrado!")
}

func GetServicesPayment(c *gin.Context) {
	sp, err := List()

	if err != nil {
		utils.Resp(c, 400, "Erro no banco de dados!", err.Error())
		return
	}

	c.JSON(200, sp)
}

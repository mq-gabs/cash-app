package employeespayments

import (
	"cash/backend/modules/employees"
	"cash/backend/utils"
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type EmployeesPaymentsDto struct {
	Value    int                 `json:"value"`
	PaidAt   *time.Time          `json:"paid_at"`
	Employee *employees.Employee `json:"employee"`
}

func CreateEmployeePayment(c *gin.Context) {
	b := &EmployeesPaymentsDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	sp := New()

	sp.Update(b)

	fmt.Println(b)

	if err := sp.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(sp); err != nil {
		utils.Resp(c, 500, "Erro no banco de dados!", err)
		return
	}

	utils.Resp(c, 201, "Pagamento registrado!")
}

func GetEmployeesPayments(c *gin.Context) {
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

func GetOneEmployeePayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	e, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Pagamento não encontrado", err)
		return
	}

	c.JSON(200, e)
}

func UpdateEmployeePayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	ep, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Pagamento não encontrado!", err)
		return
	}

	b := &EmployeesPaymentsDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	ep.Update(b)

	if err := ep.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(ep); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Dados atualizados!")
}

func DeleteEmployeePayment(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	if _, err := DBFindOne(id); err != nil {
		utils.RespNotFound(c, "Pagamento não encontrado", err)
		return
	}

	if err := DBDelete(id); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Pagamento excluído!")
}

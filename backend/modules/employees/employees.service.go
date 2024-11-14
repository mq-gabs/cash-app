package employees

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type EmployeeDto struct {
	Name string `json:"name"`
	Wage int    `json:"wage"`
	Role string `json:"role"`
}

func CreateEmployee(c *gin.Context) {
	b := &EmployeeDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	e := New()

	e.Update(b)

	if err := e.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(e); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 201, "Funcionário cadastrado!")
}

func ListEmployees(c *gin.Context) {
	q := utils.NewQuery()

	if err := c.BindQuery(q); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	es, err := DBList(q)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	c.JSON(200, es)
}

func GetOneEmployee(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	e, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Funcionário não encontrado", err)
		return
	}

	c.JSON(200, e)
}

func UpdateEmployee(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	e, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Funcionário não encontrado!", err)
		return
	}

	b := &EmployeeDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	e.Update(b)

	if err = e.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(e); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Dados atualizados!")
}

func DeleteEmployee(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	if _, err := DBFindOne(id); err != nil {
		utils.RespNotFound(c, "Funcionário não encontrado", err)
		return
	}

	if err := DBDelete(id); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Funcionário excluído!")
}

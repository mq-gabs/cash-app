package users

import (
	"cash/backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserDto struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     Role   `json:"role"`
}

func CreateUser(c *gin.Context) {
	b := &UserDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	u := New()

	u.Update(b)

	if err := u.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	err := DBSave(u)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 201, "Usuário cadastrado!")
}

func FindUsers(c *gin.Context) {
	q := utils.NewQuery()

	if err := c.BindQuery(q); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	us, err := DBList(q)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	c.JSON(200, us)
}

func GetOneUser(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	e, err := DBFindOne(id)

	if err != nil {
		utils.RespNotFound(c, "Usuário não encontrado", err)
		return
	}

	c.JSON(200, e)
}

func UpdateUser(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	u, err := DBFindOne(id)
	if err != nil {
		utils.RespNotFound(c, "Usuário não encontrado!", err)
		return
	}

	b := &UserDto{}

	if err := c.BindJSON(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	u.Update(b)

	if err := u.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	if err := DBSave(u); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Dados atualizados!")
}

func DeleteUser(c *gin.Context) {
	id := uuid.MustParse(c.Param("id"))

	if _, err := DBFindOne(id); err != nil {
		utils.RespNotFound(c, "Usuário não encontrado", err)
		return
	}

	if err := DBDelete(id); err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	utils.Resp(c, 200, "Usuário excluído!")
}

package users

import (
	"cash/backend/database"
	"cash/backend/utils"
)

func Save(u *User) {
	db := database.Conn()

	db.Save(u)
}

func List() *utils.List {
	db := database.Conn()

	users := &[]*User{}

	db.Find(users)

	return &utils.List{
		Data:  users,
		Count: 0,
	}
}

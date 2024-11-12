package users

import (
	"cash/backend/database"
	"cash/backend/utils"
)

func Save(u *User) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	db.Save(u)

	return nil
}

func List() (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	users := &[]*User{}

	db.Find(users)

	return &utils.List{
		Data:  users,
		Count: 0,
	}, nil
}

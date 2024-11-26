package users

import (
	"cash/backend/database"
	"cash/backend/utils"

	"github.com/google/uuid"
)

func DBSave(u *User) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Save(u).Error; err != nil {
		return err
	}

	return nil
}

func DBList(q *utils.Query) (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	us := &[]*User{}

	var c int64

	if err := db.Find(us).Count(&c).Error; err != nil {
		return nil, err
	}

	if err := db.Limit(q.PageSize).Offset(q.Page * q.PageSize).Order("name ASC").Find(us).Error; err != nil {
		return nil, err
	}

	return &utils.List{
		Data:  us,
		Count: c,
	}, nil
}

func DBFindOne(id uuid.UUID) (*User, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	us := New()

	us.ID = id

	if err := db.First(us).Error; err != nil {
		return nil, err
	}

	return us, nil
}

func DBDelete(id uuid.UUID) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Delete(&User{}, id).Error; err != nil {
		return err
	}

	return nil
}

func DBGetUserByEmail(email string) (*User, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	u := &User{}

	u.Email = email

	if err := db.Find(u).Error; err != nil {
		return nil, err
	}

	return u, nil
}

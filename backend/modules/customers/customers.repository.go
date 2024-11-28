package customers

import (
	"cash/backend/database"
	"cash/backend/utils"

	"github.com/google/uuid"
)

func DBSave(c *Customer) error {
	db, err := database.Conn()

	if err != nil {
		return nil
	}

	if err := db.Save(c).Error; err != nil {
		return err
	}

	return nil
}

func DBList(q *utils.Query) (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	ctms := &[]*Customer{}

	var c int64

	if err := db.Find(ctms).Count(&c).Error; err != nil {
		return nil, err
	}

	if err := db.Limit(q.PageSize).Offset(q.Page * q.PageSize).Order("name ASC").Find(ctms).Error; err != nil {
		return nil, err
	}

	return &utils.List{
		Data:  ctms,
		Count: c,
	}, nil
}

func DBFindOne(id uuid.UUID) (*Customer, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	ctm := New()

	ctm.ID = id

	if err := db.First(ctm).Error; err != nil {
		return nil, err
	}

	return ctm, nil
}

func DBDelete(id uuid.UUID) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Delete(&Customer{}, id).Error; err != nil {
		return err
	}

	return nil
}

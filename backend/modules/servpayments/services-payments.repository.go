package servpayments

import (
	"cash/backend/database"
	"cash/backend/utils"

	"github.com/google/uuid"
)

func DBSave(sp *ServicesPayment) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Save(sp).Error; err != nil {
		return err
	}

	return nil
}

func DBList(q *utils.Query) (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	sps := &[]*ServicesPayment{}

	var c int64

	if err := db.Find(sps).Count(&c).Error; err != nil {
		return nil, err
	}

	if err := db.Preload("Services").Limit(q.PageSize).Offset(q.Page * q.PageSize).Order("updated_at DESC").Find(sps).Error; err != nil {
		return nil, err
	}

	return &utils.List{
		Data:  sps,
		Count: c,
	}, nil
}

func DBFindOne(id uuid.UUID) (*ServicesPayment, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	sp := New()

	sp.ID = id

	if err := db.Preload("Services").First(sp).Error; err != nil {
		return nil, err
	}

	return sp, nil
}

func DBDelete(id uuid.UUID) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Delete(&ServicesPayment{}, id).Error; err != nil {
		return err
	}

	return nil
}

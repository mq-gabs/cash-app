package employees

import (
	"cash/backend/database"
	"cash/backend/utils"

	"github.com/google/uuid"
)

func DBSave(e *Employee) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Save(e).Error; err != nil {
		return err
	}

	return nil
}

func DBList(q *utils.Query) (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	es := &[]*Employee{}

	var c int64

	if err := db.Find(es).Count(&c).Error; err != nil {
		return nil, err
	}

	if err := db.Limit(q.PageSize).Offset(q.Page * q.PageSize).Order("created_at DESC").Find(es).Error; err != nil {
		return nil, err
	}

	return &utils.List{
		Data:  es,
		Count: c,
	}, nil
}

func DBFindOne(id uuid.UUID) (*Employee, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	e := New()

	e.ID = id

	if err := db.First(e).Error; err != nil {
		return nil, err
	}

	return e, nil
}

func DBDelete(id uuid.UUID) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Delete(&Employee{}, id).Error; err != nil {
		return err
	}

	return nil
}

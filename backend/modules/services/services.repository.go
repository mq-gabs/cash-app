package services

import (
	"cash/backend/database"
	"cash/backend/utils"

	"github.com/google/uuid"
)

func DBSave(s *Service) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	db.Save(s)

	return nil
}

func DBList(q *utils.Query) (*utils.List, error) {

	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	ss := &[]*Service{}

	var c int64

	if err := db.Find(ss).Count(&c).Error; err != nil {
		return nil, err
	}

	if err := db.Limit(q.PageSize).Offset(q.Page * q.PageSize).Order("name ASC").Find(ss).Error; err != nil {
		return nil, err
	}

	return &utils.List{
		Data:  ss,
		Count: c,
	}, nil
}

func DBFindOne(id uuid.UUID) (*Service, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	s := New()

	s.ID = id

	if err := db.First(s).Error; err != nil {
		return nil, err
	}

	return s, nil
}

func DBDelete(id uuid.UUID) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Delete(&Service{}, id).Error; err != nil {
		return err
	}

	return nil
}

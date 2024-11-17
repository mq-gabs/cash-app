package employeespayments

import (
	"cash/backend/database"
	"cash/backend/utils"

	"github.com/google/uuid"
)

func DBSave(ep *EmployeesPayment) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Save(ep).Error; err != nil {
		return err
	}

	return nil
}

func DBList(q *utils.Query) (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	eps := &[]*EmployeesPayment{}

	var c int64

	if err := db.Find(eps).Count(&c).Error; err != nil {
		return nil, err
	}

	if err := db.Preload("Employee").Limit(q.PageSize).Offset(q.Page * q.PageSize).Order("paid_at DESC").Find(eps).Error; err != nil {
		return nil, err
	}

	return &utils.List{
		Data:  eps,
		Count: c,
	}, nil
}

func DBFindOne(id uuid.UUID) (*EmployeesPayment, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	sp := New()

	sp.ID = id

	if err := db.Preload("Employee").First(sp).Error; err != nil {
		return nil, err
	}

	return sp, nil
}

func DBDelete(id uuid.UUID) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Delete(&EmployeesPayment{}, id).Error; err != nil {
		return err
	}

	return nil
}

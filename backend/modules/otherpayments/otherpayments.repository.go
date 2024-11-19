package otherpayments

import (
	"cash/backend/database"
	"cash/backend/utils"

	"github.com/google/uuid"
)

func DBSave(op *OtherPayments) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Save(op).Error; err != nil {
		return err
	}

	return nil
}

func DBList(q *utils.Query) (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	op := &[]*OtherPayments{}

	var c int64

	if err := db.Find(op).Count(&c).Error; err != nil {
		return nil, err
	}

	if err := db.Limit(q.PageSize).Offset(q.Page * q.PageSize).Order("paid_at DESC").Find(op).Error; err != nil {
		return nil, err
	}

	return &utils.List{
		Data:  op,
		Count: c,
	}, nil
}

func DBFindOne(id uuid.UUID) (*OtherPayments, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	op := New()

	op.ID = id

	if err := db.First(op).Error; err != nil {
		return nil, err
	}

	return op, nil
}

func DBDelete(id uuid.UUID) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	if err := db.Delete(&OtherPayments{}, id).Error; err != nil {
		return err
	}

	return nil
}

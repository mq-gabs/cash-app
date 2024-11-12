package servpayments

import (
	"cash/backend/database"
	"cash/backend/utils"
)

func Save(sp *ServicesPayment) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	db.Save(sp)

	return nil
}

func List() (*utils.List, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	sps := &[]*ServicesPayment{}

	db.Find(sps)

	return &utils.List{
		Data:  sps,
		Count: 0,
	}, nil
}

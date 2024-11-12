package services

import (
	"cash/backend/database"
	"cash/backend/utils"
)

func Save(s *Service) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	db.Save(s)

	return nil
}

func List() (*utils.List, error) {
	services := &[]*Service{}

	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	db.Find(services)

	return &utils.List{
		Data:  services,
		Count: 0,
	}, nil
}

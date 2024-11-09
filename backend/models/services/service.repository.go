package services

import (
	"cash/backend/database"
	"cash/backend/utils"
)

func Save(s *Service) {
	db := database.Conn()

	db.Save(s)
}

func List() *utils.List {
	services := &[]*Service{}

	db := database.Conn()

	db.Find(services)

	return &utils.List{
		Data:  services,
		Count: 0,
	}
}

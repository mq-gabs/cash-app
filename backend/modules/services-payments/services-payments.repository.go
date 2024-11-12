package servicespayments

import (
	"cash/backend/database"
	"cash/backend/utils"
)

func Save(sp *ServicesPayment) {
	db := database.Conn()

	db.Save(sp)
}

func List() *utils.List {
	db := database.Conn()

	sps := &[]*ServicesPayment{}

	db.Find(sps)

	return &utils.List{
		Data:  sps,
		Count: 0,
	}
}

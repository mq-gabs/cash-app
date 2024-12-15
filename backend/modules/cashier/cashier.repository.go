package cashier

import (
	"cash/backend/database"

	"github.com/google/uuid"
)

func DBSave(c *Cashier) error {
	db, err := database.Conn()

	if err != nil {
		return err
	}

	db.Save(c)

	return nil
}

func DBFindOne(id uuid.UUID) (*Cashier, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	c := New()

	c.ID = id

	if err := db.First(c).Error; err != nil {
		return nil, err
	}

	return c, nil
}

func DBFindOneOpen() (*Cashier, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	cs := &Cashier{}

	if err := db.Preload("OpenBy").Preload("ClosedBy").Where("closed_at IS NULL").First(cs).Error; err != nil {
		return nil, err
	}

	return cs, nil
}
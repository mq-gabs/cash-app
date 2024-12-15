package utils

import (
	"time"
)

type Query struct {
	Page         int    `form:"page"`
	PageSize     int    `form:"pageSize"`
	Term         string `form:"term"`
	CustomerName string `form:"customer_name"`
	StartAt      *time.Time `form:"start_at"`
	EndAt				 *time.Time `form:"end_at"`
	CashierID string `form:"cashier_id"`
}

func NewQuery() *Query {
	return &Query{
		Page:     0,
		PageSize: 10,
	}
}

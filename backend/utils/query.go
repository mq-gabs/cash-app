package utils

type Query struct {
	Page     int    `form:"page"`
	PageSize int    `form:"pageSize"`
	Term     string `form:"term"`
}

func NewQuery() *Query {
	return &Query{
		Page:     0,
		PageSize: 10,
	}
}
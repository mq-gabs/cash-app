package main_test

import (
	"fmt"
	"testing"
	"time"
)

func TestEnum(t *testing.T) {
	tm := time.Date(2024, 3, 1, 0, 0, 0, 0, time.UTC)

	tm2 := tm.AddDate(0, 1, 0)
	tm3 := tm.AddDate(0, 0, -1)

	fmt.Println(tm)
	fmt.Println(tm2)
	fmt.Println(tm3)
	fmt.Println(tm3.String())

}

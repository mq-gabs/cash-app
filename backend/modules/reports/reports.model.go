package reports

import "cash/backend/modules/otherpayments"

type ServiceAnalysis struct {
	Revenue   *[]*ServiceRevenueAnalysis `json:"revenue"`
	Count     *[]*ServiceCountAnalysis   `json:"count"`
	MonthView *ServicesMonthAnalysis     `json:"month_view"`
}

type ServicesMonthAnalysis struct {
	Day1  int `json:"day1"`
	Day2  int `json:"day2"`
	Day3  int `json:"day3"`
	Day4  int `json:"day4"`
	Day5  int `json:"day5"`
	Day6  int `json:"day6"`
	Day7  int `json:"day7"`
	Day8  int `json:"day8"`
	Day9  int `json:"day9"`
	Day10 int `json:"day10"`
	Day11 int `json:"day11"`
	Day12 int `json:"day12"`
	Day13 int `json:"day13"`
	Day14 int `json:"day14"`
	Day15 int `json:"day15"`
	Day16 int `json:"day16"`
	Day17 int `json:"day17"`
	Day18 int `json:"day18"`
	Day19 int `json:"day19"`
	Day20 int `json:"day20"`
	Day21 int `json:"day21"`
	Day22 int `json:"day22"`
	Day23 int `json:"day23"`
	Day24 int `json:"day24"`
	Day25 int `json:"day25"`
	Day26 int `json:"day26"`
	Day27 int `json:"day27"`
	Day28 int `json:"day28"`
	Day29 int `json:"day29"`
	Day30 int `json:"day30"`
	Day31 int `json:"day31"`
}

type ServiceRevenueAnalysis struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Revenue int    `json:"revenue"`
}
type ServiceCountAnalysis struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Count int    `json:"count"`
}

type EmployeesPaymentsSum struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Value int    `json:"value"`
}

type EmployeesAnalysis struct {
	Count             int                      `json:"count"`
	Cost              int                      `json:"cost"`
	EmployeesPayments *[]*EmployeesPaymentsSum `json:"employees_payments"`
}

type OtherPaymentsAnalysis struct {
	Count         int                             `json:"count"`
	Cost          int                             `json:"cost"`
	OtherPayments *[]*otherpayments.OtherPayments `json:"other_payments"`
}

type GeneralAnalysis struct {
	Revenue      int     `json:"revenue"`
	Cost         int     `json:"cost"`
	Profit       int     `json:"profit"`
	ProfitMargin float64 `json:"profit_margin"`
}

type ReportData struct {
	ServicesAnalysis      *ServiceAnalysis       `json:"services_analysis"`
	EmployeesAnalysis     *EmployeesAnalysis     `json:"employees_analysis"`
	OtherPaymentsAnalysis *OtherPaymentsAnalysis `json:"other_payments_analysis"`
	GeneralAnalysis       *GeneralAnalysis       `json:"general_analysis"`
}

package reports

import (
	"cash/backend/modules/otherpayments"
	"errors"
	"strconv"
	"time"
)

type GenMonthReportDto struct {
	Month int `form:"month"`
	Year  int `form:"year"`
}

func (gmr *GenMonthReportDto) String() (string, string) {
	m := strconv.Itoa(gmr.Month)

	if gmr.Month < 10 {
		m = "0" + m
	}

	return m, strconv.Itoa(gmr.Year)
}

func (b *GenMonthReportDto) Validate() error {
	if b.Month < 1 || b.Month > 12 {
		return errors.New("month must be 1 <= month <= 12")
	}

	if b.Year == 0 {
		return errors.New("year cannot be empty")
	}

	return nil
}

type ServiceAnalysis struct {
	Revenue   *[]*ServiceRevenueAnalysis `json:"revenue"`
	Count     *[]*ServiceCountAnalysis   `json:"count"`
	MonthView *ServicesMonthAnalysis     `json:"month_view"`
	YearView *ServicesYearAnalysis `json:"year_view"`
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

type ServicesYearAnalysis struct {
	Jan int `json:"jan"`
	Fev int `json:"fev"`
	Mar int `json:"mar"`
	Apr int `json:"apr"`
	May int `json:"may"`
	Jun int `json:"jun"`
	Jul int `json:"jul"`
	Aug int `json:"aug"`
	Sep int `json:"sep"`
	Oct int `json:"oct"`
	Nov int `json:"nov"`
	Dec int `json:"dec"`
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

type GenDailyReportDto struct {
	Day   int `form:"day"`
	Month int `form:"month"`
	Year  int `form:"year"`
}

func (gdr *GenDailyReportDto) Validate() error {
	if gdr.Day < 1 || gdr.Day > 31 {
		return errors.New("day must be 1 <= day <= 31")
	}

	if gdr.Month < 1 || gdr.Month > 12 {
		return errors.New("month must be 1 <= month <= 12")
	}

	if gdr.Year == 0 {
		return errors.New("year cannot be empty")
	}

	if gdr.Month == 2 {
		if (gdr.Year%4 == 0 && gdr.Day > 29) || (gdr.Year%4 != 0 && gdr.Day > 28) {
			return errors.New("invalid day")
		}
	}

	return nil
}

func (gdr *GenDailyReportDto) String() (string, string, string) {
	d := strconv.Itoa(gdr.Day)

	if gdr.Day < 10 {
		d = "0" + d
	}

	m := strconv.Itoa(gdr.Month)

	if gdr.Month < 10 {
		m = "0" + m
	}

	y := strconv.Itoa(gdr.Year)

	return d, m, y
}

type GenYearReportDto struct {
	Year int `form:"year"`
}

func (gyr *GenYearReportDto) Validate() error {
	if gyr.Year == 0 {
		return errors.New("year cannot be empty")
	}

	return nil
}

func (gyr *GenYearReportDto) String() string {
	return strconv.Itoa(gyr.Year)
}

type GenPeriodReportDto struct {
	StartAt *time.Time `form:"start_at"`
	EndAt *time.Time `form:"end_at"`
}

func (gpr *GenPeriodReportDto) Validate() error {
	if gpr.StartAt == nil {
		return errors.New("start_at cannot be empty")
	}

	if gpr.EndAt == nil {
		return errors.New("end_at cannot be empty")
	}

	return nil
}

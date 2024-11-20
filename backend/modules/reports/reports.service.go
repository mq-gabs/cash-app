package reports

import (
	"cash/backend/modules/otherpayments"
	"cash/backend/utils"
	"errors"
	"time"

	"github.com/gin-gonic/gin"
)

type ServiceAnalysis struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Revenue int    `json:"revenue"`
	Count   int    `json:"count"`
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

type ReportData struct {
	ServicesAnalysis      *[]*ServiceAnalysis    `json:"services_analysis"`
	EmployeesAnalysis     *EmployeesAnalysis     `json:"employees_analysis"`
	OtherPaymentsAnalysis *OtherPaymentsAnalysis `json:"other_payments_analysis"`
}

type GenMonthReportDto struct {
	Month int `form:"month"`
	Year  int `form:"year"`
}

func (b *GenMonthReportDto) Validate() error {
	if b.Month < 1 || b.Month > 12 {
		return errors.New("month must be 0 > month <= 11")
	}

	if b.Year == 0 {
		return errors.New("year cannot be empty")
	}

	return nil
}

func GenMonthReport(c *gin.Context) {
	b := &GenMonthReportDto{}

	if err := c.BindQuery(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	if err := b.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	tStart := time.Date(b.Year, time.Month(b.Month), 1, 0, 0, 0, 0, time.UTC)
	tEnd := tStart.AddDate(0, 1, 0)

	sas, err := DBAnalyseServices(&tStart, &tEnd)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	ea, err := DBAnalyseEmployees(&tStart, &tEnd)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	opa, err := DBAnalyseOtherPayments(&tStart, &tEnd)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	r := &ReportData{
		ServicesAnalysis:      sas,
		EmployeesAnalysis:     ea,
		OtherPaymentsAnalysis: opa,
	}

	c.JSON(200, r)
}

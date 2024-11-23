package reports

import (
	"cash/backend/utils"
	"errors"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type GenMonthReportDto struct {
	Month int `form:"month"`
	Year  int `form:"year"`
}

func (gmr *GenMonthReportDto) String() (string, string) {
	return strconv.Itoa(gmr.Month), strconv.Itoa(gmr.Year)
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

	ma, err := DBServicesMonthAnalysis(b.String())

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	sas.MonthView = ma

	r := &ReportData{
		ServicesAnalysis:      sas,
		EmployeesAnalysis:     ea,
		OtherPaymentsAnalysis: opa,
	}

	c.JSON(200, r)
}

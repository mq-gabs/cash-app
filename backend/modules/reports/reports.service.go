package reports

import (
	"cash/backend/utils"
	"time"

	"github.com/gin-gonic/gin"
)

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

	ga, err := DBGeneralAnalysis(&tStart, &tEnd)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	r := &ReportData{
		ServicesAnalysis:      sas,
		EmployeesAnalysis:     ea,
		OtherPaymentsAnalysis: opa,
		GeneralAnalysis:       ga,
	}

	c.JSON(200, r)
}

func GenDailyReport(c *gin.Context) {
	b := &GenDailyReportDto{}

	if err := c.BindQuery(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	if err := b.Validate(); err != nil {
		utils.RespNotValid(c, err)
		return
	}

	tStart := time.Date(b.Year, time.Month(b.Month), b.Day, 0, 0, 0, 0, time.UTC)
	tEnd := tStart.AddDate(0, 0, 1)

	sa, err := DBAnalyseServices(&tStart, &tEnd)

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

	ga, err := DBGeneralAnalysis(&tStart, &tEnd)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	rd := &ReportData{
		ServicesAnalysis:      sa,
		EmployeesAnalysis:     ea,
		OtherPaymentsAnalysis: opa,
		GeneralAnalysis:       ga,
	}

	c.JSON(200, rd)
}

func GenYearReport(c *gin.Context) {
	b := &GenYearReportDto{}

	if err := c.BindQuery(b); err != nil {
		utils.RespErrorBind(c, err)
		return
	}

	tStart := time.Date(b.Year, 1, 1, 0, 0, 0, 0, time.UTC)
	tEnd := tStart.AddDate(1, 0, 0)

	sa, err := DBAnalyseServices(&tStart, &tEnd)

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

	ga, err := DBGeneralAnalysis(&tStart, &tEnd)

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	sya, err := DBServicesAnualAnalysis(b.String())

	if err != nil {
		utils.RespErrorDB(c, err)
		return
	}

	sa.YearView = sya

	rd := &ReportData{
		ServicesAnalysis:      sa,
		EmployeesAnalysis:     ea,
		OtherPaymentsAnalysis: opa,
		GeneralAnalysis:       ga,
	}

	c.JSON(200, rd)
}
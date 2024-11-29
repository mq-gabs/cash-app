package reports

import (
	"cash/backend/database"
	"cash/backend/modules/otherpayments"
	"time"
)

func DBAnalyseServices(dateStart, dateEnd *time.Time) (*ServiceAnalysis, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	query := `
		SELECT
			s.id,
			s.name,
			SUM(s.price) as "revenue"
		FROM services_payments_services sps
		LEFT JOIN services_payments sp
			ON sps.services_payment_id = sp.id
			AND sp.deleted_at IS NULL
		LEFT JOIN services s
			ON s.id = sps.service_id
			AND s.deleted_at IS NULL
		WHERE sp.paid_at > '` + dateStart.String() + `'
		AND sp.paid_at < '` + dateEnd.String() + `'
		GROUP BY s.price
		ORDER BY "revenue" DESC
	`

	rows, err := db.Raw(query).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	sras := []*ServiceRevenueAnalysis{}

	for rows.Next() {
		sra := &ServiceRevenueAnalysis{}

		rows.Scan(&sra.ID, &sra.Name, &sra.Revenue)

		sras = append(sras, sra)
	}

	query2 := `
		SELECT
			s.id,
			s.name,
			COUNT(s.id) as "count"
		FROM services_payments_services sps
		LEFT JOIN services_payments sp
			ON sps.services_payment_id = sp.id
			AND sp.deleted_at IS NULL
		LEFT JOIN services s
			ON s.id = sps.service_id
			AND s.deleted_at IS NULL
		WHERE sp.paid_at > '` + dateStart.String() + `'
		AND sp.paid_at < '` + dateEnd.String() + `'
		GROUP BY s.id
		ORDER BY "count" DESC
	`
	rows2, err := db.Raw(query2).Rows()

	if err != nil {
		return nil, err
	}

	defer rows2.Close()

	scas := []*ServiceCountAnalysis{}

	for rows2.Next() {
		sca := &ServiceCountAnalysis{}

		rows2.Scan(&sca.ID, &sca.Name, &sca.Count)

		scas = append(scas, sca)
	}

	sa := &ServiceAnalysis{
		Revenue: &sras,
		Count:   &scas,
	}

	return sa, nil
}

func DBAnalyseEmployees(dateStart, dateEnd *time.Time) (*EmployeesAnalysis, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	ea := &EmployeesAnalysis{}

	query := `
		SELECT
			COUNT(DISTINCT e.id) as "count",
			SUM(ep.value) as "cost"
		FROM employees_payments ep
		LEFT JOIN employees e
			ON e.id = ep.employee_id
			AND e.deleted_at IS NULL
		WHERE ep.paid_at > '` + dateStart.String() + `'
		AND ep.paid_at < '` + dateEnd.String() + `'
		AND ep.deleted_at IS NULL
		`

	rows, err := db.Raw(query).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	if rows.Next() {
		rows.Scan(&ea.Count, &ea.Cost)
	}

	query2 := `
		SELECT
			ep.id,
			e.name,
			ep.value
		FROM employees_payments ep
		LEFT JOIN employees e
			ON e.id = ep.employee_id
			AND e.deleted_at IS NULL
		WHERE ep.paid_at > '` + dateStart.String() + `'
		AND ep.paid_at < '` + dateEnd.String() + `'
		AND ep.deleted_at IS NULL
		ORDER BY ep.value DESC
	`

	rows2, err := db.Raw(query2).Rows()

	if err != nil {
		return nil, err
	}

	defer rows2.Close()

	eps := []*EmployeesPaymentsSum{}

	for rows2.Next() {
		ep := &EmployeesPaymentsSum{}

		rows2.Scan(&ep.ID, &ep.Name, &ep.Value)

		eps = append(eps, ep)
	}

	ea.EmployeesPayments = &eps

	return ea, nil
}

func DBAnalyseOtherPayments(dateStart, dateEnd *time.Time) (*OtherPaymentsAnalysis, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	opa := &OtherPaymentsAnalysis{}

	query := `
		SELECT
			COUNT(op.id) as "count",
			SUM(op.value) as "cost"
		FROM other_payments op
		WHERE op.paid_at > '` + dateStart.String() + `'
		AND op.paid_at < '` + dateEnd.String() + `'
		AND op.deleted_at IS NULL
		`

	rows, err := db.Raw(query).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	if rows.Next() {
		rows.Scan(&opa.Count, &opa.Cost)
	}

	otherPayments := &[]*otherpayments.OtherPayments{}

	if err := db.Where("paid_at > ? AND paid_at < ?", dateStart, dateEnd).Order("value DESC").Find(otherPayments).Error; err != nil {
		return nil, err
	}

	opa.OtherPayments = otherPayments

	return opa, nil
}

func DBServicesMonthAnalysis(month, year string) (*ServicesMonthAnalysis, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	query := `
	SELECT
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '01' THEN 1 ELSE 0 END) as "day1",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '02' THEN 1 ELSE 0 END) as "day2",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '03' THEN 1 ELSE 0 END) as "day3",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '04' THEN 1 ELSE 0 END) as "day4",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '05' THEN 1 ELSE 0 END) as "day5",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '06' THEN 1 ELSE 0 END) as "day6",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '07' THEN 1 ELSE 0 END) as "day7",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '08' THEN 1 ELSE 0 END) as "day8",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '09' THEN 1 ELSE 0 END) as "day9",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '10' THEN 1 ELSE 0 END) as "day10",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '11' THEN 1 ELSE 0 END) as "day11",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '12' THEN 1 ELSE 0 END) as "day12",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '13' THEN 1 ELSE 0 END) as "day13",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '14' THEN 1 ELSE 0 END) as "day14",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '15' THEN 1 ELSE 0 END) as "day15",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '16' THEN 1 ELSE 0 END) as "day16",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '17' THEN 1 ELSE 0 END) as "day17",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '18' THEN 1 ELSE 0 END) as "day18",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '19' THEN 1 ELSE 0 END) as "day19",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '20' THEN 1 ELSE 0 END) as "day20",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '21' THEN 1 ELSE 0 END) as "day21",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '22' THEN 1 ELSE 0 END) as "day22",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '23' THEN 1 ELSE 0 END) as "day23",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '24' THEN 1 ELSE 0 END) as "day24",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '25' THEN 1 ELSE 0 END) as "day25",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '26' THEN 1 ELSE 0 END) as "day26",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '27' THEN 1 ELSE 0 END) as "day27",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '28' THEN 1 ELSE 0 END) as "day28",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '29' THEN 1 ELSE 0 END) as "day29",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '30' THEN 1 ELSE 0 END) as "day30",
		SUM(CASE WHEN strftime('%d', sp.paid_at) = '31' THEN 1 ELSE 0 END) as "day31"
	FROM services_payments sp
	WHERE strftime('%m-%Y', sp.paid_at) = '` + month + `-` + year + `'
	AND sp.deleted_at IS NULL
	`

	rows, err := db.Raw(query).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	ma := &ServicesMonthAnalysis{}

	if rows.Next() {
		rows.Scan(
			&ma.Day1,
			&ma.Day2,
			&ma.Day3,
			&ma.Day4,
			&ma.Day5,
			&ma.Day6,
			&ma.Day7,
			&ma.Day8,
			&ma.Day9,
			&ma.Day10,
			&ma.Day11,
			&ma.Day12,
			&ma.Day13,
			&ma.Day14,
			&ma.Day15,
			&ma.Day16,
			&ma.Day17,
			&ma.Day18,
			&ma.Day19,
			&ma.Day20,
			&ma.Day21,
			&ma.Day22,
			&ma.Day23,
			&ma.Day24,
			&ma.Day25,
			&ma.Day26,
			&ma.Day27,
			&ma.Day28,
			&ma.Day29,
			&ma.Day30,
			&ma.Day31,
		)
	}

	return ma, nil
}

func DBServicesAnualAnalysis() {
	//		SELECT
	//		SUM(CASE WHEN strftime('%m', sp.paid_at) = '1' THEN 1 ELSE 0 END) as "january",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '2' THEN 1 ELSE 0 END) as "february",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '3' THEN 1 ELSE 0 END) as "march",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '4' THEN 1 ELSE 0 END) as "april",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '5' THEN 1 ELSE 0 END) as "may",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '6' THEN 1 ELSE 0 END) as "june",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '7' THEN 1 ELSE 0 END) as "july",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '8' THEN 1 ELSE 0 END) as "august",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '9' THEN 1 ELSE 0 END) as "september",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '10' THEN 1 ELSE 0 END) as "october",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '11' THEN 1 ELSE 0 END) as "november",
	//	  SUM(CASE WHEN strftime('%m', sp.paid_at) = '12' THEN 1 ELSE 0 END) as "december"
	//
	// FROM services_payments sp
	// WHERE strftime('%Y', sp.paid_at) = '2024'
}

func DBGeneralAnalysis(dateStart, dateEnd *time.Time) (*GeneralAnalysis, error) {
	db, err := database.Conn()

	if err != nil {
		return nil, err
	}

	ga := &GeneralAnalysis{}

	query := `
		SELECT
			COALESCE(SUM(sp.value), 0) as "revenue"
		FROM services_payments sp
		WHERE sp.deleted_at IS NULL
		AND sp.paid_at > '` + dateStart.String() + `'
		AND sp.paid_at < '` + dateEnd.String() + `'`

	rows, err := db.Raw(query).Rows()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	if rows.Next() {
		if err := rows.Scan(&ga.Revenue); err != nil {
			return nil, err
		}
	}

	query2 := `
		SELECT (
			(SELECT
				COALESCE(SUM(ep.value), 0) as "cost"
			FROM employees_payments ep
			WHERE ep.deleted_at IS NULL
			AND ep.paid_at > '` + dateStart.String() + `'
			AND ep.paid_at < '` + dateEnd.String() + `')
			+
			(SELECT
				COALESCE(SUM(op.value), 0) as "cost"
			FROM other_payments op
			WHERE op.deleted_at IS NULL
			AND op.paid_at > '` + dateStart.String() + `'
			AND op.paid_at < '` + dateEnd.String() + `')
		) as "cost"

	`

	rows2, err := db.Raw(query2).Rows()

	if err != nil {
		return nil, err
	}

	defer rows2.Close()

	if rows2.Next() {
		if err := rows2.Scan(&ga.Cost); err != nil {
			return nil, err
		}
	}

	ga.Profit = ga.Revenue - ga.Cost

	if ga.Revenue != 0 && ga.Profit > 0 {
		ga.ProfitMargin = float64(ga.Profit) / float64(ga.Revenue)
	}

	return ga, nil
}

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
		LEFT JOIN services s
			ON s.id = sps.service_id
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
		LEFT JOIN services s
			ON s.id = sps.service_id
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
			COUNT(ep.id) as "count",
			SUM(ep.value) as "cost"
		FROM employees_payments ep
		LEFT JOIN employees e
			ON e.id = ep.employee_id
		WHERE ep.paid_at > '` + dateStart.String() + `'
		AND ep.paid_at < '` + dateEnd.String() + `'`

	rows, err := db.Raw(query).Rows()

	if err != nil {
		return nil, err
	}

	if rows.Next() {
		rows.Scan(&ea.Count, &ea.Cost)
	}

	query2 := `
		SELECT
			e.id,
			e.name,
			SUM(ep.value) as "value"
		FROM employees_payments ep
		LEFT JOIN employees e
			ON e.id = ep.employee_id
			WHERE ep.paid_at > '` + dateStart.String() + `'
		AND ep.paid_at < '` + dateEnd.String() + `'
		GROUP BY e.name
		ORDER BY SUM(ep.value) DESC
	`

	rows2, err := db.Raw(query2).Rows()

	if err != nil {
		return nil, err
	}

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
		AND op.paid_at < '` + dateEnd.String() + `'`

	rows, err := db.Raw(query).Rows()

	if err != nil {
		return nil, err
	}

	if rows.Next() {
		rows.Scan(&opa.Count, &opa.Cost)
	}

	otherPayments := &[]*otherpayments.OtherPayments{}

	if err := db.Where("paid_at > ? AND paid_at < ?", dateStart, dateEnd).Order("paid_at DESC").Find(otherPayments).Error; err != nil {
		return nil, err
	}

	opa.OtherPayments = otherPayments

	return opa, nil
}

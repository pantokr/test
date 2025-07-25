package repository

import (
	"backend/db"
)

type Loan struct {
	ID              int    `json:"id"`
	Debtor          string `json:"debtor"`
	Amount          int64  `json:"loan_amount"`
	PropertyAddress string `json:"property_address"`
	ApplicationDate string `json:"application_date"`
	Status          string `json:"status"`
}

func GetLoans() ([]Loan, error) {
	rows, err := db.DB.Query(`
		SELECT id, debtor, loan_amount, property_address, application_date, status
		FROM loan_reviews
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var loans []Loan
	for rows.Next() {
		var loan Loan
		err := rows.Scan(
			&loan.ID,
			&loan.Debtor,
			&loan.Amount,
			&loan.PropertyAddress,
			&loan.ApplicationDate,
			&loan.Status,
		)
		if err != nil {
			return nil, err
		}
		loans = append(loans, loan)
	}
	return loans, nil
}

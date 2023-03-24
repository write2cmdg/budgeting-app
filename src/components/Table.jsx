import React from 'react'

//components imports
import ExpenseItem from './ExpenseItem'

const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className='table'>
        <thead>
            <tr>
                {
                    ["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((i, index) => (
                        <th key={index}>{i}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                expenses.map((expense) => (
                    <tr key={expense.id}>
                        <ExpenseItem expense={expense} showBudget={showBudget} />
                    </tr>
                ))
            }
        </tbody>
    </div>
  )
}

export default Table
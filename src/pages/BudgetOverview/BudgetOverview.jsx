import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import SortableTable from '../../Utils/SortableTable/SortableTable';
import './BudgetOverview.css';

const BudgetOverview = () => {
    const { budgetState, incomeSort, updateIncomeSort, deleteIncome, deleteExpense } = useBudget();
    const [combinedData, setCombinedData] = useState([...budgetState.income, ...budgetState.expenses]);
    const getColorClass = (amount) => {
        return amount >= 0 ? 'income-color' : 'expense-color';
    };
    const totalIncome = budgetState.income.reduce((total, incomeItem) => {
        const incomeAmount = parseFloat(incomeItem.amount);
        return isNaN(incomeAmount) ? total : total + incomeAmount;
    }, 0);
    const totalExpenses = budgetState.expenses.reduce((total, expenseItem) => {
        const expenseAmount = parseFloat(expenseItem.amount);
        return isNaN(expenseAmount) ? total : total + expenseAmount;
    }, 0);
    const remainingBudget = totalIncome - totalExpenses;

    const handleIncomeSort = (field, direction) => {
        updateIncomeSort(field, direction);
        const sortedData = [...combinedData].sort((a, b) => {
            if (direction === 'asc') {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        }
        );
        setCombinedData(sortedData);
    };

    const handleDelete = (itemId) => {
        const item = budgetState.income.find(item => item.id === itemId);
        const updatedData = combinedData.filter(item => item.id !== itemId);
        setCombinedData(updatedData);
        if (item) deleteIncome(itemId);
        else deleteExpense(itemId);
    };

    return (
        <div className='budget-container'>
            <h2 className='budget-heading'>Budget Overview</h2>

            <div className='summary'>
                <span className='total-income'>
                    Total Income: {isNaN(totalIncome) ? 'N/A' : `$${totalIncome.toFixed(2)}`}
                </span>
                <span className='total-expenses'>
                    Total Expenses: {isNaN(totalExpenses) ? 'N/A' : `$${totalExpenses.toFixed(2)}`}
                </span>
                <span className='remaining-budget'>Remaining Budget: ${remainingBudget.toFixed(2)}</span>
            </div>

            <div className='description'>
                <p className={getColorClass(remainingBudget)}>
                    {remainingBudget >= 0
                        ? 'You are on track with your budget!'
                        : 'You are exceeding your budget!'}
                </p>
            </div>

            <h3>Budget Overview</h3>
            <SortableTable
                data={combinedData}
                columns={[
                    { field: 'name', title: 'Name' },
                    { field: 'amount', title: 'Amount', cellClassName: (item) => (item.amount >= 0 ? 'income-color' : 'expense-color') }, // Update cellClassName
                    { field: 'date', title: 'Date' },
                ]}
                onSort={handleIncomeSort}
                currentSort={incomeSort}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default BudgetOverview;

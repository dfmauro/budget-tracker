import React from 'react';
import { render, screen } from '@testing-library/react';
import AddExpense from '../AddExpense';
import { BudgetProvider } from '../../../context/BudgetContext';

const mockData = {
  income: [
    { id: '1', name: 'Income 1', amount: 100, date: '2023-09-01', type: 'income' },
    { id: '2', name: 'Income 2', amount: 200, date: '2023-09-02', type: 'income' },
  ],
  expenses: [
    { id: '3', name: 'Expense 1', amount: -50, date: '2023-09-03', type: 'expense' },
    { id: '4', name: 'Expense 2', amount: -75, date: '2023-09-04', type: 'expense' },
  ],
  incomeSort: { field: '', direction: 'asc' },
  expenseSort: { field: '', direction: 'asc' },
  updateIncomeSort: jest.fn(),
  updateExpenseSort: jest.fn(),
  deleteIncome: jest.fn(),
  deleteExpense: jest.fn(),
};

describe('AddExpense Component', () => {
  it('renders the AddExpense component', () => {
    render(
      <BudgetProvider value={mockData}>
        <AddExpense />
      </BudgetProvider>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Add Expense');
    
  });
  it('renders sortable table', () => {
    render(
      <BudgetProvider value={mockData}>
        <AddExpense />
      </BudgetProvider>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Add Expense');
  });
 
});


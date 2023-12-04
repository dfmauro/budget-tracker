import React from 'react';
import { render, screen } from '@testing-library/react';
import BudgetOverview from '../BudgetOverview';
import { BudgetProvider } from '../../../context/BudgetContext';

const mockData = {
  budgetState : {
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
  },
  budgetDispatch: jest.fn(),
};

describe('BudgetOverview Component', () => {
  it('renders description with correct color class', () => {
    render(
      <BudgetProvider value={mockData}>
        <BudgetOverview />
      </BudgetProvider>
    );

    expect(screen.getByText('You are on track with your budget!')).toHaveClass('income-color');
  });
  it('renders description with correct color class', () => {
    render(
      <BudgetProvider value={mockData}>
        <BudgetOverview />
      </BudgetProvider>
    );

    expect(screen.getByText('You are on track with your budget!')).toHaveClass('income-color');
  }
  );
  it('renders sortable table', () => {
    render(
      <BudgetProvider value={mockData}>
        <BudgetOverview />
      </BudgetProvider>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header Component', () => {
  it('renders the header with navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const budgetOverviewLink = screen.getByText('Budget Overview');
    const addIncomeLink = screen.getByText('Add Income');
    const addExpenseLink = screen.getByText('Add Expense');

    expect(budgetOverviewLink).toBeInTheDocument();
    expect(addIncomeLink).toBeInTheDocument();
    expect(addExpenseLink).toBeInTheDocument();
  });

  it('links to the correct paths', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const budgetOverviewLink = screen.getByText('Budget Overview');
    const addIncomeLink = screen.getByText('Add Income');
    const addExpenseLink = screen.getByText('Add Expense');

    expect(budgetOverviewLink).toHaveAttribute('href', '/');
    expect(addIncomeLink).toHaveAttribute('href', '/add-income');
    expect(addExpenseLink).toHaveAttribute('href', '/add-expense');
  });
});

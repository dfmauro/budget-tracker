import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TransactionForm from '../TransactionForm';

// Mock the useBudget hook
jest.mock('../../../context/BudgetContext', () => ({
  useBudget: () => ({
    addIncome: jest.fn(),
    addExpense: jest.fn(),
  }),
}));

describe('TransactionForm Component', () => {
  it('renders without errors', () => {
    const { getByText } =  render(<TransactionForm type="income" />);
    expect(getByText('Add Income')).toBeInTheDocument();
  });

  it('handles input changes correctly', () => {
    const { getByPlaceholderText } = render(<TransactionForm type="income" />);
    const nameInput = getByPlaceholderText('Name');
    const amountInput = getByPlaceholderText('Amount');

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(amountInput, { target: { value: '123.45' } });

    expect(nameInput.value).toBe('Test Name');
    expect(amountInput.value).toBe('123.45');
  });

  it('prevents non-numeric characters in the amount field', () => {
    const { getByPlaceholderText } = render(<TransactionForm type="income" />);
    const amountInput = getByPlaceholderText('Amount');

    fireEvent.change(amountInput, { target: { value: 'abc' } });

    expect(amountInput.value).toBe('');
  });

  it('displays an error message for missing fields', async () => {
    const { getByText } = render(<TransactionForm type="income" />);
    const addButton = getByText('Add Income');

    fireEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Please fill in all fields.')).toBeInTheDocument();
    });
  });

  it('submits the form with valid input', async () => {
    const { getByPlaceholderText, getByText } = render(<TransactionForm type="income" />);
    const nameInput = getByPlaceholderText('Name');
    const amountInput = getByPlaceholderText('Amount');
    const addButton = getByText('Add Income');

    fireEvent.change(nameInput, { target: { value: 'Test Income' } });
    fireEvent.change(amountInput, { target: { value: '123.45' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(amountInput.value).toBe('');
    });
  });
});

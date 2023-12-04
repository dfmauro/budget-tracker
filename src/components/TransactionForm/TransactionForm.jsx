import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import './TransactionForm.css';

const TransactionForm = ({ type }) => {
  const { addIncome, addExpense } = useBudget();
  const [newTransaction, setNewTransaction] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().substr(0, 10),
  });
  const [error, setError] = useState('');

  const handleAmountKeyDown = (e) => {
    if (
      !/[\d.]|[Backspace]|[Delete]|[Tab]|[Enter]/.test(e.key) ||
      (e.key === "." && newTransaction.amount.includes("."))
    ) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && isNaN(value)) {
      return;
    }

    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const generateUniqueID = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleAddTransaction = () => {
    if (!newTransaction.name || !newTransaction.amount || !newTransaction.date) {
      setError('Please fill in all fields.');
      return;
    }

    if (isNaN(newTransaction.amount) || parseFloat(newTransaction.amount) <= 0) {
      setError('Amount must be a valid positive number.');
      return;
    }

    const transaction = {
      id: generateUniqueID(),
      type: type,
      ...newTransaction,
    };

    if (type === 'income') {
      addIncome(transaction);
    } else if (type === 'expense') {
      addExpense(transaction);
    }

    setNewTransaction({
      name: '',
      amount: '',
      date: new Date().toISOString().substr(0, 10),
    });
    setError('');
  };

  return (
    <div className='transaction-form'>
      <div className='input-container'>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={newTransaction.name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='amount'
          placeholder='Amount'
          value={newTransaction.amount}
          onChange={handleInputChange}
          onKeyDown={handleAmountKeyDown}
        />
        <input
          type='date'
          name='date'
          value={newTransaction.date}
          onChange={handleInputChange}
        />
      </div>

      {error && <p className='error-message'>{error}</p>}

      <button onClick={handleAddTransaction}>Add {type === 'income' ? 'Income' : 'Expense'}</button>
    </div>
  );
};

export default TransactionForm;

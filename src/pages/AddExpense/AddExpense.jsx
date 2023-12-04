import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import SortableTable from '../../Utils/SortableTable/SortableTable';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import './AddExpense.css';

const AddExpense = () => {
  const { budgetState, expenseSort, updateExpenseSort, deleteExpense } = useBudget();

  const handleDeleteExpense = (expenseId) => {
    deleteExpense(expenseId);
  };

  const handleExpenseSort = (field, direction) => {
    updateExpenseSort(field, direction);
  };

  return (
    <div className='add-expense-container'>
      <h2>Add Expense</h2>

      <TransactionForm type='expense' />

      <h3>Expense List</h3>
      <SortableTable
        data={budgetState.expenses}
        type='expense'
        columns={[
          { field: 'name', title: 'Name' },
          { field: 'amount', title: 'Amount' },
          { field: 'date', title: 'Date' },
        ]}
        onSort={handleExpenseSort}
        currentSort={expenseSort}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
};

export default AddExpense;

import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import SortableTable from '../../Utils/SortableTable/SortableTable';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import './AddIncome.css';

const AddIncome = () => {
  const { budgetState, incomeSort, updateIncomeSort, deleteIncome } = useBudget();

    const handleDeleteIncome = (incomeId) => {
    deleteIncome(incomeId);
  };

  const handleIncomeSort = (field, direction) => {
    updateIncomeSort(field, direction);
  };

  return (
    <div className='add-income-container'>
      <h2>Add Income</h2>

      <TransactionForm type='income' />

      <h3>Income List</h3>
      <SortableTable
        data={budgetState.income}
        columns={[
          { field: 'name', title: 'Name' },
          { field: 'amount', title: 'Amount' },
          { field: 'date', title: 'Date' },
        ]}
        onSort={handleIncomeSort}
        currentSort={incomeSort}
        onDelete={handleDeleteIncome} 
      />
    </div>
  );
};

export default AddIncome;

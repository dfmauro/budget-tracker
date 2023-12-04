import React, { createContext, useContext, useState, useMemo } from 'react';

const BudgetContext = createContext();

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const BudgetProvider = ({ children }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeSort, setIncomeSort] = useState({ field: '', direction: 'asc' });
  const [expenseSort, setExpenseSort] = useState({ field: '', direction: 'asc' });

  const updateIncomeSort = (field, direction) => {
    setIncomeSort({ field, direction });
  };

  const updateExpenseSort = (field, direction) => {
    setExpenseSort({ field, direction });
  };

    const deleteIncome = (incomeId) => {
      setIncomeData((prevIncomeData) => prevIncomeData.filter((income) => income.id !== incomeId));
    };
  
    const deleteExpense = (expenseId) => {
      setExpenseData((prevExpenseData) => prevExpenseData.filter((expense) => expense.id !== expenseId));
    };
  

  const sortedIncomeData = useMemo(() => sortData(incomeData, incomeSort), [incomeData, incomeSort]);
  const sortedExpenseData = useMemo(() => sortData(expenseData, expenseSort), [expenseData, expenseSort]);

  const value = useMemo(() => {
    return {
      budgetState: {
        income: sortedIncomeData,
        expenses: sortedExpenseData,
      },
      incomeSort,
      expenseSort,
      updateIncomeSort,
      updateExpenseSort,
      addIncome: (newIncome) => setIncomeData((prevIncomeData) => [...prevIncomeData, newIncome]),
      addExpense: (newExpense) => setExpenseData((prevExpenseData) => [...prevExpenseData, newExpense]),
      deleteIncome,
      deleteExpense,
    };
  }, [sortedIncomeData, sortedExpenseData, incomeSort, expenseSort]);

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

const sortData = (data, { field, direction }) => {
  if (field && direction) {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (direction === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    return sortedData;
  } else {
    return data;
  }
};

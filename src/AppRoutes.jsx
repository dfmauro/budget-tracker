import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import BudgetOverview from './pages/BudgetOverview/BudgetOverview';
import AddIncome from './pages/AddIncome/AddIncome';
import AddExpense from './pages/AddExpense/AddExpense';

function AppRoutes() {
    return (
        <Router>
        <Header />
            <Routes>
                <Route path="/" element={<BudgetOverview />} />
                <Route path="/add-income" element={<AddIncome />} />
                <Route path="/add-expense" element={<AddExpense />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;

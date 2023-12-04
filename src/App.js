import React from 'react';
import AppRoutes from './AppRoutes';
import { BudgetProvider } from './context/BudgetContext';

function App() {
  return (
    <div className="App">
      <BudgetProvider>
        <AppRoutes />
      </BudgetProvider>
    </div>
  );
}

export default App;

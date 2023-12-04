import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Budget Overview</Link></li>
          <li><Link to="/add-income">Add Income</Link></li>
          <li><Link to="/add-expense">Add Expense</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

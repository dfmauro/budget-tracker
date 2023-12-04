import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import './SortableTable.css';

const SortableTable = ({ data, columns, onSort, currentSort, onDelete }) => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onSort(field, newDirection);
  };

  const cellClassName = (item, column) => {
    if (column.field === 'amount') {
      return item.type === 'income' ? 'income-color' : 'expense-color';
    }
    return '';
  };

  const handleDelete = (itemId) => {
    onDelete(itemId);
  };

  return (
    <table className='budget-table'>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field} onClick={() => handleSort(column.field)}>
              <span className='th-name'>{column.title}</span>
              {currentSort.field === column.field && (
                <FontAwesomeIcon
                  icon={currentSort.direction === 'asc' ? faSortUp : faSortDown}
                />
              )}
              {currentSort.field !== column.field && <FontAwesomeIcon icon={faSort} />}
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.field} className={cellClassName(item, column)}>
                {item[column.field]}
              </td>
            ))}
            <td>
              <button
                onClick={() => handleDelete(item.id)}
                className='delete-button'
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SortableTable;

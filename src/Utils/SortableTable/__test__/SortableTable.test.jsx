import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SortableTable from '../SortableTable';

const mockData = [
  { id: '1', name: 'Item 1', amount: 100, date: '2023-09-01', type: 'income' },
  { id: '2', name: 'Item 2', amount: 200, date: '2023-09-02', type: 'expense' },
];

const mockColumns = [
  { field: 'name', title: 'Name' },
  { field: 'amount', title: 'Amount' },
  { field: 'date', title: 'Date' },
];

const mockSort = jest.fn();
const mockDelete = jest.fn();

const mockCurrentSort = {
  field: 'name',
  direction: 'asc',
};

describe('SortableTable Component', () => {
  it('renders table headers and data', () => {
    render(
      <SortableTable
        data={mockData}
        columns={mockColumns}
        onSort={mockSort}
        onDelete={mockDelete}
        currentSort={mockCurrentSort}
      />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('2023-09-01')).toBeInTheDocument();
    expect(screen.getByText('2023-09-02')).toBeInTheDocument();
  });

  it('calls the onSort function when header is clicked', () => {
    render(
      <SortableTable
        data={mockData}
        columns={mockColumns}
        onSort={mockSort}
        onDelete={mockDelete}
        currentSort={mockCurrentSort}
      />
    );

    const nameHeader = screen.getByText('Name');

    fireEvent.click(nameHeader);

    expect(mockSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('calls the onDelete function when delete button is clicked', () => {
    render(
      <SortableTable
        data={mockData}
        columns={mockColumns}
        onSort={mockSort}
        onDelete={mockDelete}
        currentSort={mockCurrentSort}
      />
    );

    const deleteButton = screen.getAllByRole('button')[0];
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledWith('1');

  });
});

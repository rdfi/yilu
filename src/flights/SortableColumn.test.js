import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import { SortableColumn } from './SortableColumn';
import { sortDirections } from './sort-directions';

test('No sort options, classList contains sortable', () => {
    const {getByTestId} = render(<SortableColumn columnName="theColumn" onSortingChanged={() => {}}>The column</SortableColumn>)

    const sortableContainer = getByTestId('sortable-container');

    expect(sortableContainer).toHaveClass('sortable');
    expect(sortableContainer).not.toHaveClass('ascending');
    expect(sortableContainer).not.toHaveClass('descending');
});

test('Ascending sorting options for another column, classList contains sortable', () => {
    const {getByTestId} = render(<SortableColumn columnName="theColumn" sortOptions={{columnName: 'x', direction:sortDirections.ascending}} onSortingChanged={() => {}}>The column</SortableColumn>)

    const sortableContainer = getByTestId('sortable-container');

    expect(sortableContainer).toHaveClass('sortable');
    expect(sortableContainer).not.toHaveClass('ascending');
    expect(sortableContainer).not.toHaveClass('descending');
});

test('Descending sorting options for another column, classList contains sortable', () => {
    const {getByTestId} = render(<SortableColumn columnName="theColumn" sortOptions={{columnName: 'x', direction:sortDirections.descending}} onSortingChanged={() => {}}>The column</SortableColumn>)

    const sortableContainer = getByTestId('sortable-container');

    expect(sortableContainer).toHaveClass('sortable');
    expect(sortableContainer).not.toHaveClass('ascending');
    expect(sortableContainer).not.toHaveClass('descending');
});

test('Ascending sorting options classList contains sortable and ascending', () => {
    const {getByTestId} = render(<SortableColumn columnName="theColumn" sortOptions={{columnName: 'theColumn', direction:sortDirections.ascending}} onSortingChanged={() => {}}>The column</SortableColumn>)

    const sortableContainer = getByTestId('sortable-container');

    expect(sortableContainer).toHaveClass('sortable');
    expect(sortableContainer).toHaveClass('ascending');
    expect(sortableContainer).not.toHaveClass('descending');
});

test('Descending sorting options classList contains sortable and descending', () => {
    const {getByTestId} = render(<SortableColumn columnName="theColumn" sortOptions={{columnName: 'theColumn', direction:sortDirections.descending}} onSortingChanged={() => {}}>The column</SortableColumn>)

    const sortableContainer = getByTestId('sortable-container');

    expect(sortableContainer).toHaveClass('sortable');
    expect(sortableContainer).not.toHaveClass('ascending');
    expect(sortableContainer).toHaveClass('descending');
});

test('Column has no sorting, clicking on it makes it sort in descending order', () => {
    let sortOptions = null
    function handleSorting(so) {
        sortOptions = so;
    }
    
    const {getByTestId} = render(<SortableColumn columnName="theColumn" onSortingChanged={handleSorting}>The column</SortableColumn>)

    fireEvent.click(getByTestId('sortable-container'));

    expect(sortOptions).not.toBeNull()
    expect(sortOptions.columnName).toBe('theColumn')
    expect(sortOptions.direction).toBe(sortDirections.descending);    
})

test('Column is descending, clicking on it makes it sort in ascending order', () => {
    let sortOptions = null
    function handleSorting(so) {
        sortOptions = so;
    }
    
    const {getByTestId} = render(<SortableColumn columnName="theColumn" sortOptions={{columnName: 'theColumn', direction: sortDirections.descending}} onSortingChanged={handleSorting}>The column</SortableColumn>)

    fireEvent.click(getByTestId('sortable-container'));

    expect(sortOptions).not.toBeNull()
    expect(sortOptions.columnName).toBe('theColumn')
    expect(sortOptions.direction).toBe(sortDirections.ascending);    
})

test('Column is ascending, clicking on it removed sorting', () => {
    let sortOptions = null
    function handleSorting(so) {
        sortOptions = so;
    }
    
    const {getByTestId} = render(<SortableColumn columnName="theColumn" sortOptions={{columnName: 'theColumn', direction: sortDirections.ascending}} onSortingChanged={handleSorting}>The column</SortableColumn>)

    fireEvent.click(getByTestId('sortable-container'));

    expect(sortOptions).not.toBeNull()
    expect(sortOptions.columnName).toBe('theColumn')
    expect(sortOptions.direction).toBe(sortDirections.none);    
})
import React from 'react';
import { sortDirections } from './sort-directions'
import PropTypes from 'prop-types';


/**
 * Renders a sorting indicator and raises onSortingChanged({columnName, direction: "ascending|descending|none"})
 * @param {object} props
 * @param {string} props.columnName
 * @param {{columnName: string, direction: string}} [props.sortOptions]
 * @param {object} props.children
 * @param {(sortOptions: {columnName: string, direction:string}) => void} props.onSortingChanged
 */
export function SortableColumn({ columnName, sortOptions, children, onSortingChanged }) {    
    const sortDirection = sortOptions?.columnName === columnName ? sortOptions?.direction : sortDirections.none;
    function handleSortingChanged() {
        switch (sortDirection) {
            case sortDirections.none:
                onSortingChanged({columnName, direction: sortDirections.descending});
                break;
            case sortDirections.descending:
                onSortingChanged({columnName, direction: sortDirections.ascending});
                break;
            case sortDirections.ascending:
                onSortingChanged({columnName, direction: sortDirections.none});
                break;
            default:
                throw new Error('Invalid sort direction');
        }
    }

    return <div data-testid="sortable-container" className={`sortable ${sortDirection || ''}`} onClick={handleSortingChanged}>
        {children}
    </div>
}

SortableColumn.propTypes = {
    columnName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onSortingChanged: PropTypes.func.isRequired
}

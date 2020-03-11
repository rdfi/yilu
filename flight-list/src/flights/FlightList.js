import React, { useState, useEffect } from 'react';
import { getFlights, sortDirections } from './flighs.service'
import { Table } from 'semantic-ui-react';
import { getDateFromUnixTime } from '../unix-time.service';
import moment from 'moment';
import './FlightList.scss'

export function FlightList() {
    const [flights, setFlights] = useState(/**@type {import('./flighs.service').Flight[]} */([]));
    const [sortOptions, setSortOptions] = useState(/**@type {{columnName?: string, direction?: string}} */({}))

    useEffect(() => {
        getFlights(sortOptions.columnName, sortOptions.direction).then(setFlights, error => {
            alert(error);
        });
    }, [sortOptions])

    return (<div className="flight-list">
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Flight No</Table.HeaderCell>
                    <Table.HeaderCell><SortableColumn columnName="origin" sortOptions={sortOptions} onSortingChanged={setSortOptions}>Origin</SortableColumn></Table.HeaderCell>
                    <Table.HeaderCell><SortableColumn columnName="destination" sortOptions={sortOptions} onSortingChanged={setSortOptions}>Destination</SortableColumn></Table.HeaderCell>
                    <Table.HeaderCell><SortableColumn columnName="boarding-time" sortOptions={sortOptions} onSortingChanged={setSortOptions}>Boarding Time</SortableColumn></Table.HeaderCell>
                    <Table.HeaderCell><SortableColumn columnName="departure-time" sortOptions={sortOptions} onSortingChanged={setSortOptions}>Departure Time</SortableColumn></Table.HeaderCell>
                    <Table.HeaderCell>Gate</Table.HeaderCell>
                    <Table.HeaderCell>Seat</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {flights.map(flight => <FlightRow flight={flight} key={flight.segment_id} />)}
            </Table.Body>
        </Table>
    </div>)
}

/** @param {{flight: import('./flighs.service').Flight}} props*/
function FlightRow({ flight }) {
    const departureTime = flight?.departure ? moment(getDateFromUnixTime(flight.departure)).format('DD/MM/YYYY HH:mm') : 'N/A'
    const boardingTime = flight?.detail?.boarding ? moment(getDateFromUnixTime(flight.detail.boarding)).format('DD/MM/YYYY HH:mm') : 'N/A';
    return (
        <Table.Row>
            <Table.Cell>{flight.detail.flight_number}</Table.Cell>
            <Table.Cell>{flight.origin.value}</Table.Cell>
            <Table.Cell>{flight.destination.value}</Table.Cell>
            <Table.Cell>{boardingTime}</Table.Cell>
            <Table.Cell>{departureTime}</Table.Cell>
            <Table.Cell>{flight?.detail?.gate || 'N/A'}</Table.Cell>
            <Table.Cell>{flight?.detail?.seat || 'N/A'}</Table.Cell>
        </Table.Row>
    )
}

function SortableColumn({ columnName, sortOptions, children, onSortingChanged }) {    
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

    return <div className={`sortable ${sortDirection || ''}`} onClick={handleSortingChanged}>
        {children}
    </div>
}

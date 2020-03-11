import React from 'react';
import {render, waitForElement, wait, getByTestId} from '@testing-library/react';
import {getFlights} from './flighs.service';
import { FlightList } from './FlightList';
jest.mock('./flighs.service')

/**@type {jest.Mock} */
let getFlightsMock = getFlights;
/** @type {import('./flighs.service').Flight} */
let flight;

beforeEach(() => {
    getFlightsMock.mockReset();
    getFlightsMock.mockName('getFlights')
    flight =  {
        segment_id: "123",
        destination: {
            value: 'LAX'
        },
        origin: {
            value: 'NYC'
        },
        departure: new Date(2020, 1, 1, 22, 0).getTime()/1000,
        detail: {
            boarding: new Date(2020, 1, 1, 21, 0).getTime()/1000,
            flight_number: 'flightNumber',
            gate: "theGate",
            seat: "theSeat"
        }
    }
})

test('No flights available displays no flights', async () => {
    getFlightsMock.mockResolvedValue([]);

    const {getByText} = render(<FlightList/>);

    expect(await waitForElement(() => getByText('No flights'))).toBeInTheDocument();
});

test('Flight available, displays flight correctly', async () => {
    getFlightsMock.mockResolvedValue([flight]);

    const {getByText} = render(<FlightList/>);

    expect(await waitForElement(() => getByText(flight.destination.value))).toBeInTheDocument();
    expect(await waitForElement(() => getByText(flight.origin.value))).toBeInTheDocument();
    expect(await waitForElement(() => getByText(flight.detail.flight_number))).toBeInTheDocument();
    expect(await waitForElement(() => getByText(flight.detail.gate))).toBeInTheDocument();
    expect(await waitForElement(() => getByText(flight.detail.seat))).toBeInTheDocument();
});

test('Flight available without departure time, displays N/A in the departure time', async () => {
    delete flight.departure;
    getFlightsMock.mockResolvedValue([flight]);

    const {getByTestId} = render(<FlightList/>);

    expect(await waitForElement(() => getByTestId('departure-time'))).toHaveTextContent('N/A')
});

test('Flight available without boarding time, displays N/A in the barding time', async () => {
    delete flight.detail.boarding;
    getFlightsMock.mockResolvedValue([flight]);

    const {getByTestId} = render(<FlightList/>);

    expect(await waitForElement(() => getByTestId('boarding-time'))).toHaveTextContent('N/A');
});

test('Flight available without gate, displays N/A in the gate info', async () => {
    delete flight.detail.gate;
    getFlightsMock.mockResolvedValue([flight]);

    const {getByTestId} = render(<FlightList/>);

    expect(await waitForElement(() => getByTestId('gate-info'))).toHaveTextContent('N/A');
});

test('Flight available without seat, displays N/A in the seat info', async () => {
    delete flight.detail.seat;
    getFlightsMock.mockResolvedValue([flight]);

    const {getByTestId} = render(<FlightList/>);

    expect(await waitForElement(() => getByTestId('seat-info'))).toHaveTextContent('N/A');
});
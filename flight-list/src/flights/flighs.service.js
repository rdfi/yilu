export const sortDirections = {
    ascending: 'ascending',
    descending: 'descending',
    none: ''
}

export async function getFlights(sortColumn = '', sortDirection = sortDirections.none) {    
    const results = flights.filter(f => f.type === 'FLIGHT');        
    if (sortDirection === sortDirections.none) return results;
    switch (sortColumn) {
        case 'boarding-time':
            return Promise.resolve(results.sort((flight1, flight2) => {
                return sortDirection === sortDirections.ascending ? flight1?.detail?.boarding >= flight2?.detail?.boarding ? 1 : -1 : flight1?.detail?.boarding >= flight2?.detail?.boarding ? -1 : 1
            }));
        case 'departure-time':
            return Promise.resolve(results.sort((flight1, flight2) => {
                return sortDirection === sortDirections.ascending ? flight1.departure >= flight2.departure ? 1 : -1 : flight1.departure >= flight2.departure ? -1 : 1
            }));
        case 'origin':
            return Promise.resolve(results.sort((flight1, flight2) => {
                return sortDirection === sortDirections.ascending ? flight1.origin?.value >= flight2.origin?.value ? 1 : -1 : flight1.origin?.value >= flight2.origin?.value ? -1 : 1
            }));
        case 'destination':
            return Promise.resolve(results.sort((flight1, flight2) => {
                return sortDirection === sortDirections.ascending ? flight1.destination?.value >= flight2.destination?.value ? 1 : -1 : flight1.destination?.value >= flight2.destination?.value ? -1 : 1
            }));
        default:
            return results;
    }
}

/** 
 * @typedef Flight
 * @property {string} segment_id
 * @property {string} type
 * @property {{type: string, value: string}} origin
 * @property {{type: string, value: string}} destination
 * @property {number} [departure]
 * @property {{boarding?: number, flight_number?: string, gate?: string, seat?: string}} detail
 */


/** @type {Flight[]} */
const flights = [
    {
        "segment_id": "07f77c9f-7fdf-446b-91d5-52e900f33723",
        "type": "FLIGHT",
        "origin": {
            "type": "AIRPORT",
            "value": "TXL"
        },
        "destination": {
            "type": "AIRPORT",
            "value": "MUC"
        },
        "departure": 1523602800,
        "detail": {
            "boarding": 1523601000,
            "flight_number": "LH2031",
            "gate": "B24",
            "seat": "17B"
        }
    },
    {
        "segment_id": "07f77c9f-7fdf-446b-91d5-52e900f33724",
        "type": "FLIGHT",
        "origin": {
            "type": "AIRPORT",
            "value": "LAX"
        },
        "destination": {
            "type": "AIRPORT",
            "value": "LIS"
        },
        "departure": 1593601200,
        "detail": {
            "boarding": 1593597600,
            "flight_number": "BA0222",
            "gate": "B15",
            "seat": "1A"
        }
    },

    {
        "segment_id": "07f77c9f-7fdf-446b-91d5-52e900f33725",
        "type": "FLIGHT",
        "origin": {
            "type": "AIRPORT",
            "value": "LIS"
        },
        "destination": {
            "type": "AIRPORT",
            "value": "DUB"
        },
        "departure": 1596277800,
        "detail": {
            "boarding": 1596276000,
            "flight_number": "TP2042",
            "gate": "A42",
            "seat": "14F"
        }
    },

    {
        "segment_id": "07f77c9f-7fdf-446b-91d5-52e900f33726",
        "type": "FLIGHT",
        "origin": {
            "type": "AIRPORT",
            "value": "CRO"
        },
        "destination": {
            "type": "AIRPORT",
            "value": "SCO"
        },
        "detail": {
            "flight_number": "XE2531",
        }
    },

    {
        "segment_id": "07f77c9f-7fdf-446b-91d5-52e900f33727",
        "type": "FLIGHT",
        "origin": {
            "type": "AIRPORT",
            "value": "NYC"
        },
        "destination": {
            "type": "AIRPORT",
            "value": "RAR"
        },
        "departure": 1580554200,
        "detail": {
            "boarding": 1580553000,
            "flight_number": "PE6031",
            "gate": "B54"
        }
    },

]



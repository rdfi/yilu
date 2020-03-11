import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.scss';
import {Container} from 'semantic-ui-react'
import {FlightList} from './flights/FlightList'

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Flights</h1>
        <FlightList/>
      </Container>
    </div>
  );
}

export default App;

import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faGasPump} from "@fortawesome/free-solid-svg-icons";
import Map from "./components/map/Map";
import React from 'react'
import MetaTab from "./components/tab/MetaTab";

  function App() {

  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon className="logo" icon={faGasPump} size="3x" />
        <p><i className="fas fa-gas-pump"/>FUEL</p>
        <FontAwesomeIcon className="logo" icon={faBars} size="2x" />
      </header>
      <div className="body">
        <p>Truc</p>
        <Map/>
      </div>
      <div className="tab">
        <MetaTab/>
      </div>
    </div>
  );
}

export default App;

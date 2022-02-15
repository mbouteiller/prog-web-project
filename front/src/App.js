import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faGasPump} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from 'react'
import MetaTab from "./components/tab/MetaTab";
import MapComponent from "./components/map/Map";


function App() {

  const url = "http://localhost:5000/stations/test?cp=06000"
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)

  async function getStations() {
    let response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      json = json.filter(isValidPosition)
      setStations(json);
      console.log(stations)
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }

  useEffect(() => {
    if (loading) {
      getStations().then(() => setLoading(false))
    }
  })

  function isValidPosition(element) {
    return !(element.latitude === undefined || element.longitude === undefined)
  }

  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon className="logo" icon={faGasPump} size="3x" />
        <p><i className="fas fa-gas-pump"/>FUEL</p>
        <FontAwesomeIcon className="logo" icon={faBars} size="2x" />
      </header>
      <div>
        <button onClick={() => {
          setLoading(true)
        }}>MARCHE CONNARD</button>
        <MapComponent stations={stations}/>
      </div>
      <div className="tab">
        <MetaTab/>
      </div>
    </div>
  );
}

export default App;

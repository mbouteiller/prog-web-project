import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGasPump} from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components'
import React, {useContext, useEffect, useState} from 'react'
import MetaTab from "./components/tab/MetaTab";
import MapComponent from "./components/map/Map";
import Filters from "./components/filters/Filters";
import {get} from "leaflet/src/dom/DomUtil";
import {ThemeContext} from "./utils/context/Theme";

const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 20px;
    margin: 10px;
`

function App() {

  const url = "http://localhost:5000/"
  const [stations, setStations] = useState([])
  const [fuels, setFuels] = useState([])
  const [loading, setLoading] = useState(false)

  const { toggleTheme, theme } = useContext(ThemeContext)

  async function getStations(args) {
    let response = await fetch(url + "stations/test?cp=06000" + args);
    if (response.ok) {
      let json = await response.json();
      json = json.filter(isValidPosition)
      setStations(json);
      console.log(stations)
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }

  async function getFuels() {
    let response = await fetch(url + "api/fuel");
    if (response.ok) {
      let json = await response.json();
      setFuels(json)
      console.log(fuels)
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }

  useEffect(() => {
    getStations("").then(() => setLoading(false))
  }, [])

  useEffect(() => {
    getFuels().then()
  }, [])

  function isValidPosition(element) {
    return !(element.latitude === undefined || element.longitude === undefined)
  }

  return (
    <div className="App">
      <ThemeContext.Provider value="dark">
      <header className="App-header">
        <FontAwesomeIcon className="logo" icon={faGasPump} size="3x" />
        <p><i className="fas fa-gas-pump"/>FUEL</p>
        <NightModeButton onClick={() => toggleTheme()}>
          Thème : {theme === 'light' ? '☀️' : '🌙 '}
        </NightModeButton>
      </header>
      <button onClick={() => {
        setLoading(true)
      }}>MARCHE CONNARD</button>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <MapComponent stations={stations}/>
        <Filters fuels={fuels} changeStations={getStations}/>
      </div>
      <div className="tab">
        <MetaTab/>
      </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

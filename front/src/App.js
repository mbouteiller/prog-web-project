import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGasPump} from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components'
import React, {useContext, useEffect, useState} from 'react'
import MetaTab from "./components/tab/MetaTab";
import MapComponent from "./components/map/Map";
import Filters from "./components/filters/Filters";
import {ThemeContext} from "./utils/context/Theme";
import FilterProvider from './utils/context/FilterLocalisation';
import FilterPriceProvider from "./utils/context/FilterPrice";
import FilterFuelProvider from "./utils/context/FilterFuel";
import {Backdrop, CircularProgress} from "@mui/material";

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

  const [position, setPosition] = useState({latitude: '', longitude: ''})

  const { toggleTheme, theme } = useContext(ThemeContext)

  async function getStations(args) {
    setLoading(true);
    let response = await fetch(url + "stations", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args),
    });
    if (response.ok) {
      let json = await response.json();
      json = json.filter(isValidPosition)
      setStations(json);
    } else {
      alert("HTTP-Error: " + response.status);
    }
    setLoading(false);
  }

  async function getFuels() {
    let response = await fetch(url + "fuel");
    if (response.ok) {
      let json = await response.json();
      setFuels(json)
    } else {
      alert("HTTP-Error: " + response.status);
    }
  }

  /*useEffect(() => {
    let args = {"postalCode": "06"}
    getStations(args).then()
  }, [])*/

  useEffect(() => {
    getFuels().then()
  }, [])

  useEffect(() => {
    let coords;
    navigator.geolocation.getCurrentPosition(function(position) {
      coords = position.coords;
      let args = {
        "distance": {
          "distance": 100,
          "position": {
            "lat": coords.latitude,
            "long": coords.longitude
          }
        },
      }
      getStations(args).then()
      setPosition(coords);
    });
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
            Th??me : {theme === 'light' ? '??????' : '???? '}
          </NightModeButton>
        </header>
        <div className="map-body">
          { loading ?
              <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              : <div/>
          }
          <MapComponent stations={stations} position={position}/>
          <FilterProvider>
            <FilterPriceProvider>
              <FilterFuelProvider>
                <Filters fuels={fuels} changeStations={getStations} position={position}/>
              </FilterFuelProvider>
            </FilterPriceProvider>
          </FilterProvider>
        </div>
        <div className="tab">
          <MetaTab stations={stations}/>
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

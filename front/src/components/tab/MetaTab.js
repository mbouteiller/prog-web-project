import Tab from "./Tab";
import styled from "styled-components";
import React, {useState} from "react";
import Chart from "../chart/Chart";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }`

function MetaTab() {

  const url = "http://localhost:5000/"
  const [stations, setStations] = useState([]);
  const [prices, setPrices] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Stations',
        columns: [
          {
            Header: 'Adresse',
            accessor: 'adresse',
          },
          {
            Header: 'Ville',
            accessor: 'ville',
          },
          {
            Header: 'Services',
            accessor: 'services',
          },
          {
            Header: 'Graph',
            accessor: '',
            Cell: ({ cell }) => (
              <button value={cell.name} onClick={() => makeChart(cell)}>
                draw
              </button>
            )
          }
        ],
      },
    ],
    []
  )

  function makeChart(cell) {
    getStationPrices(
      cell.row.original.latitude,
      cell.row.original.longitude,
      cell.row.original.postalCode
    ).then((result) => {setPrices(result)});
  }

  async function getStationPrices(lat, long, postalCode) {
    let args = {
      "distance": {
        "distance": 1,
        "position": {
          "lat": 46.221,
          "long": 5.245
        }
      },
      "postalCode": "01000",
    }

    args.distance.position.lat = lat;
    args.distance.position.long = long;
    args.postalCode = postalCode;

    let response = await fetch(url + "stations/prix", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(args),
    });

    if (response.ok) {
      let json = await response.json();
      return json[0].prix;
    } else {
      alert("HTTP-Error: " + response.status);
      return [];
    }
  }

  async function getStations() {
    let response = await fetch(url + "stations/test?cp=06000");
    if (response.ok) {
      return await response.json();
    } else {
      alert("HTTP-Error: " + response.status);
      return [];
    }
  }

  return (
    <Styles>
      <button onClick={() => {
        getStations().then((result) => {setStations(result); console.log(result)})
      }}>MARCHE CONNARD</button>
      <Tab columns={columns} data={stations} />
      <Chart data={prices} />
    </Styles>
  );
}

export default MetaTab;
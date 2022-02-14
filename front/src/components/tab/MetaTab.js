import Tab from "./Tab";
import styled from "styled-components";
import React, {useState} from "react";

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

  const url = "http://localhost:5000/stations/test?cp=06000"
  const [stations, setStations] = useState([]);

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
          }
        ],
      },
    ],
    []
  )

  async function getStations() {
    let response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      json = json.map(v => {
        v.latitude = v._latitude / 100000;
        v.longitude = v._longitude / 100000;
        return v;
      });
      console.log(json[0]);
      return json;
    } else {
      alert("HTTP-Error: " + response.status);
      return [];
    }
  }

  return (
    <Styles>
      <button onClick={() => {
        getStations().then((result) => {setStations(result)})
      }}>MARCHE CONNARD</button>
      <Tab columns={columns} data={stations} />
    </Styles>
  );
}

export default MetaTab;
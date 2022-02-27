import Tab from "./Tab";
import styled from "styled-components";
import React, {useState} from "react";
import Chart from "../chart/Chart";

const TabStyles = styled.div`
  margin-bottom: 50px;
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

const ChartStyles = styled.div`
  margin-left: 10%;
  margin-bottom: 50px;
`

function MetaTab({stations}) {

  const url = "http://localhost:5000/"
  const [prices, setPrices] = useState([]);
  const [address, setaddress] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Stations',
        columns: [
          {
            Header: 'Code postal',
            accessor: 'cp',
          },
          {
            Header: 'Ville',
            accessor: 'ville',
          },
          {
            Header: 'Services',
            accessor: 'services',
            Cell: ({ cell }) => {
              let text = "";
              cell.value.forEach((element, index) => {
                if (index > 0) {
                  text += (", " + element);
                }
                else {
                  text += element;
                }
              })
              return text;
            }
          },
          {
            Header: 'Graph',
            accessor: '',
            Cell: ({ cell }) => (
              <button className="button" value={cell.name} onClick={() => makeChart(cell)}>
                Détails
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

    getAddress(
      cell.row.original.latitude,
      cell.row.original.longitude
    ).then((result) => {setaddress(result)})
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

  async function getAddress(lat, long) {
    let address = await fetch("http://api.positionstack.com/v1/reverse?access_key=935f9a855655607dfa8938ea45afd615&query=" + lat + "," + long);

    if (address.ok) {
      let json = await address.json();
      return json.data[0].label;
    } else {
      alert("HTTP-Error: " + address.status);
      return [];
    }
  }

  return (
    <>
      <TabStyles>
        <Tab columns={columns} data={stations} />
      </TabStyles>
      <ChartStyles>
        <Chart data={prices} address={address} />
      </ChartStyles>
    </>
  );
}

export default MetaTab;

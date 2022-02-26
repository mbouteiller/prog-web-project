import {LineChart, Legend, Line, Tooltip, XAxis, YAxis, CartesianGrid} from "recharts";

function Chart({data}) {

  if (data.length === 0) {
    return (
      <>
        <span>NO PRICE DATA</span>
      </>
    )
  }

  let formattedPrices = [];
  let dates = [];

  data.forEach((element) => {
    if (!dates.includes(element.maj)) {
      dates.push(element.maj)
    }
  })

  dates.forEach((date) => {
    let filteredFuel = data.filter((element) => {
      return date === element.maj;
    })

    let result = {date: date};

    filteredFuel.forEach((element) => {
      result[element.nom] = element.valeur
    })

    formattedPrices.push(result);
  })

  return (
    <>
      <LineChart width={1000} height={400} data={formattedPrices}
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="E10" stroke="#8884d8" />
        <Line type="monotone" dataKey="E85" stroke="#fab3a9" />
        <Line type="monotone" dataKey="GPLc" stroke="#c6ad94" />
        <Line type="monotone" dataKey="Gazole" stroke="#7fb285" />
        <Line type="monotone" dataKey="SP95" stroke="#463239" />
        <Line type="monotone" dataKey="SP98" stroke="#ed6b86" />
      </LineChart>
    </>
  )
}

export default Chart
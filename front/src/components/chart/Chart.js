import {LineChart, Legend, Line, Tooltip, XAxis, YAxis, CartesianGrid} from "recharts";

function Chart({data}) {

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

  console.log(formattedPrices)

  return (
    <>
      <LineChart width={730} height={250} data={formattedPrices}
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="E10" stroke="#8884d8" />
        <Line type="monotone" dataKey="E85" stroke="#8884d8" />
        <Line type="monotone" dataKey="GPLc" stroke="#8884d8" />
        <Line type="monotone" dataKey="Gazole" stroke="#8884d8" />
        <Line type="monotone" dataKey="SP95" stroke="#8884d8" />
        <Line type="monotone" dataKey="SP98" stroke="#8884d8" />
      </LineChart>
    </>
  )
}

export default Chart
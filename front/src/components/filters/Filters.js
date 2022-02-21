import './Filters.css';
import Checkbox from "../checkbox/Checkbox";
import {useState} from "react";
import PriceFilter from './PriceFilter'
import FuelFilter from './FuelFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function Filters({fuels, changeStations}) {

    const [filterPrice, setFilterPrice] = useState([]);
    const [filterFuel, setFilterFuel] = useState([]);
    const forceUpdate = useForceUpdate();

    function handleChangeFilterPrice(args) {
        if (args.fuel !== "" && args.minPrice !== "" && args.maxPrice !== "") {
            filterPrice[args.index] = {"fuel": args.fuel, "priceMin": args.minPrice, "priceMax": args.maxPrice}
            setFilterPrice(filterPrice);
        }
    }

    function handleSubmit() {
        let filters = []
        filterPrice.forEach(element => filters.push(element))
        filterFuel.forEach(element => filters.push({"fuel": element}))
        let args = {"postalCode": "06","fuelFilter": filters}
        console.log(args)
        changeStations(args).then()
    }

    function handleAddNewFilterPrice() {
        filterPrice.push({value: "new", key: filterPrice.length})
        setFilterPrice(filterPrice)
        forceUpdate()
    }

    function removeFilter(index) {
        filterPrice.splice(index, 1)
        setFilterPrice(filterPrice)
        forceUpdate()
        console.log(filterPrice)
    }


    return (
        <div className="container">
            <div>
                <p style={{textAlign: 'left', marginLeft: '1em'}}>Choix des carburants</p>
                <FuelFilter fuels={fuels} handleChange={setFilterFuel}/>
            </div>
            <div>
                <p style={{textAlign: 'left', marginLeft: '1em'}}>Fourchette de prix</p>
                {filterPrice.map((value, index) => {
                    return <PriceFilter fuels={fuels} handleChange={handleChangeFilterPrice} removeFilter={removeFilter} index={index} key={index} />
                })}
                <button onClick={handleAddNewFilterPrice}><FontAwesomeIcon icon={faPlus} size="1x" /></button>
            </div>
            <div>
                <p style={{textAlign: 'left', marginLeft: '1em'}}>Localisation</p>
            </div>
            <button type="button" onClick={handleSubmit}>FILTER</button>
        </div>
    )
}

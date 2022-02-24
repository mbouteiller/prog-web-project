import './Filters.css';

import {useContext, useState} from "react";
import PriceFilter from './PriceFilter'
import FuelFilter from './FuelFilter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FiltersLocalisationContext} from "../../utils/context/FilterLocalisation";
import {FilterPriceContext} from "../../utils/context/FilterPrice";
import {FilterFuelContext} from "../../utils/context/FilterFuel";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function Filters({fuels, changeStations}) {

    const [localisation, setLocalisation] = useContext(FiltersLocalisationContext)
    const [filterPrice, setFilterPrice] = useContext(FilterPriceContext)
    const [filterFuel, setFilterFuel] = useContext(FilterFuelContext)
    const forceUpdate = useForceUpdate();

    function handleSubmit() {
        let filters = []
        filterPrice.forEach(element => filters.push({"fuel": element.fuel, "priceMin": element.priceMin, "priceMax": element.priceMax}))
        filterFuel.forEach(element => filters.push({"fuel": element}))
        let args = {"postalCode": localisation,"fuelFilter": filters}
        console.log(args)
        changeStations(args).then()
    }

    function handleAddNewFilterPrice() {
        filterPrice.push({key: filterPrice.length})
        setFilterPrice(filterPrice)
        forceUpdate()
    }

    function handleLocalisation(event) {
        setLocalisation(event.target.value)
    }

    function removeFilter(index) {
        filterPrice.splice(index, 1)
        setFilterPrice(filterPrice)
        forceUpdate()
    }

    return (
        <div className="container">
            <div>
                <p style={{textAlign: 'left', marginLeft: '1em'}}>Choix des carburants</p>
                <FuelFilter fuels={fuels}/>
            </div>
            <div>
                <p style={{textAlign: 'left', marginLeft: '1em'}}>Fourchette de prix</p>
                {filterPrice.map((value, index) => {
                    return <PriceFilter fuels={fuels} removeFilter={removeFilter} index={index} key={index} />
                })}
                <button onClick={handleAddNewFilterPrice}><FontAwesomeIcon icon={faPlus} size="1x" /></button>
            </div>
            <div>
                <p style={{textAlign: 'left', marginLeft: '1em'}}>Localisation</p>
                <input type="text" value={localisation} onChange={handleLocalisation} />
            </div>
            <button type="button" onClick={handleSubmit}>FILTER</button>
        </div>
    )
}

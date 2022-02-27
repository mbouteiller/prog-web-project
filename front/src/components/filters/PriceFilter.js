import './PriceFilter.css';
import '../../utils/style/global.css'

import {useContext, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FilterPriceContext} from "../../utils/context/FilterPrice";

export default function PriceFilter(props) {

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [fuel, setFuel] = useState("");

    const [filterPrice, setFilterPrice] = useContext(FilterPriceContext)

    function handleMinPrice(event) {
      setMinPrice(event.target.value);
      filterPrice[props.index].priceMin = event.target.value;
      setFilterPrice(filterPrice);
    }

    function handleMaxPrice(event) {
      setMaxPrice(event.target.value);
      filterPrice[props.index].priceMax = event.target.value;
      setFilterPrice(filterPrice);
    }

    function handleFuel(event) {
      setFuel(event.target.value);
      filterPrice[props.index].fuel = event.target.value;
      setFilterPrice(filterPrice);
    }

    return (
        <div className="priceFilter">
            <select className="box" value={fuel} onChange={handleFuel}>
                <option value="" disabled selected>Select fuel</option>
                {props.fuels.map((value, index) => {
                    return <option value={value} key={index}>{value}</option>
                })}
            </select>
            <div className="input input-container">
                <input type="text" placeholder="Prix min" value={minPrice} onChange={handleMinPrice} />
            </div>
            <div className="input input-container">
                <input type="text" placeholder="Prix max" value={maxPrice} onChange={handleMaxPrice} />
            </div>
            <button className="button button-filter-price" onClick={props.removeFilter}><FontAwesomeIcon icon={faTrash} size="1x" /></button>
        </div>
    )
}

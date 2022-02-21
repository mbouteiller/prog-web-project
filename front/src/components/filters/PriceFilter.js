import './PriceFilter.css';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function PriceFilter(props) {

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [fuel, setFuel] = useState("");

    function handleMinPrice(event) {
        setMinPrice(event.target.value);
    }

    function handleMaxPrice(event) {
        setMaxPrice(event.target.value);
    }

    function handleFuel(event) {
        setFuel(event.target.value);
    }

    function sendToFilter() {
        props.handleChange({"index": props.index, "fuel": fuel, "minPrice": minPrice, "maxPrice": maxPrice});
    }

    return (
        <div className="priceFilter">
            <select value={fuel} onChange={handleFuel}>
                <option value="">Select fuel</option>
                {props.fuels.map((value, index) => {
                    return <option value={value} key={index}>{value}</option>
                })}
            </select>
            <input type="text" value={minPrice} onChange={handleMinPrice} />
            <input type="text" value={maxPrice} onChange={handleMaxPrice} />
            <button onClick={sendToFilter}><FontAwesomeIcon icon={faCheck} size="1x" /></button>
            <button onClick={props.removeFilter}><FontAwesomeIcon icon={faTrash} size="1x" /></button>
        </div>
    )
}

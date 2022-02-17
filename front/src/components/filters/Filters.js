import './Filters.css';
import Checkbox from "../checkbox/Checkbox";
import {useState} from "react";

export default function Filters({fuels, changeStations}) {

    const [checked, setChecked] = useState([]);

    function handleCheckboxChange(changeEvent) {
        let updatedList = [...checked];
        if (changeEvent.target.checked) {
            updatedList = [...checked, changeEvent.target.name];
        } else {
            updatedList.splice(checked.indexOf(changeEvent.target.name), 1);
        }
        setChecked(updatedList);
    };

    function handleSubmit() {
        changeStations("&fuel=\"" + checked[0] + "\"").then()
    }

    return (
        <div className="container">
            <div>
                <p style={{textAlign: 'left', marginLeft: '1em'}}>Choix des carburants</p>
                <div className="fuel-container">
                    {fuels.map((value, index) => {
                        return <Checkbox label={value} onSelectBox={handleCheckboxChange} key={index} />
                    })}
                </div>
            </div>
            <button type="button" onClick={handleSubmit}>FILTER</button>
        </div>
    )
}
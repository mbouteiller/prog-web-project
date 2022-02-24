import Checkbox from "../checkbox/Checkbox";
import {useContext, useState} from "react";
import {FilterFuelContext} from "../../utils/context/FilterFuel";

export default function Filters({fuels}) {

    const [checked, setChecked] = useState([]);
    const [filterFuel, setFilterFuel] = useContext(FilterFuelContext)

    function handleCheckboxChange(changeEvent) {
        let updatedList = [...checked];
        if (changeEvent.target.checked) {
            updatedList = [...checked, changeEvent.target.name];
        } else {
            updatedList.splice(checked.indexOf(changeEvent.target.name), 1);
        }
        setChecked(updatedList);
        setFilterFuel(updatedList)
    };

    return (
        <div className="fuel-container">
            {fuels.map((value, index) => {
                return <Checkbox label={value} onSelectBox={handleCheckboxChange} key={index} />
            })}
        </div>
    )
}


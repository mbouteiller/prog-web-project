import Checkbox from "../checkbox/Checkbox";
import {useState} from "react";

export default function Filters({fuels, handleChange}) {

    const [checked, setChecked] = useState([]);

    function handleCheckboxChange(changeEvent) {
        let updatedList = [...checked];
        if (changeEvent.target.checked) {
            updatedList = [...checked, changeEvent.target.name];
        } else {
            updatedList.splice(checked.indexOf(changeEvent.target.name), 1);
        }
        setChecked(updatedList);
        handleChange(updatedList)
    };

    return (
        <div className="fuel-container">
            {fuels.map((value, index) => {
                return <Checkbox label={value} onSelectBox={handleCheckboxChange} key={index} />
            })}
        </div>
    )
}


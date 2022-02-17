import React from "react";
import '../filters/Filters.css';

function Checkbox({ label, onSelectBox }) {
  return (
    <div className="fuel">
      <label style={{ width: '100%', display: 'flex'}}>
        <input
          style={{ width: '25%'}}
          type="checkbox"
          name={label}
          onChange={onSelectBox}
        />
        {label}
      </label>
    </div>
  )
};

export default Checkbox;


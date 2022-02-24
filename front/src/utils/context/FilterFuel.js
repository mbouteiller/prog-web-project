import {createContext, useState} from "react";

export const FilterFuelContext = createContext()

const FilterFuelProvider = ({ children }) => {
  const [filterFuel, setFilterFuel] = useState([]);

  return (
    <FilterFuelContext.Provider value={[ filterFuel, setFilterFuel ]}>
      {children}
    </FilterFuelContext.Provider>
  )
}

export default FilterFuelProvider;

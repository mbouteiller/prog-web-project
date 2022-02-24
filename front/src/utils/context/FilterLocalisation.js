import {createContext, useState} from "react";

export const FiltersContext = createContext()

const FilterProvider = ({ children }) => {
  const [localisation, setLocalisation] = useState("06");
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterFuel, setFilterFuel] = useState([]);

  return (
    <FiltersContext.Provider value={[ localisation, setLocalisation ]}>
      {children}
    </FiltersContext.Provider>
  )
}

export default FilterProvider;

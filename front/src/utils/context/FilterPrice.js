import {createContext, useState} from "react";

export const FilterPriceContext = createContext()

const FilterPriceProvider = ({ children }) => {
  const [filterPrice, setFilterPrice] = useState([]);

  return (
    <FilterPriceContext.Provider value={[ filterPrice, setFilterPrice ]}>
      {children}
    </FilterPriceContext.Provider>
  )
}

export default FilterPriceProvider;

import {createContext, useState} from "react";

export const FiltersLocalisationContext = createContext()

const FilterLocalisationProvider = ({ children }) => {
  const [localisation, setLocalisation] = useState("06");

  return (
    <FiltersLocalisationContext.Provider value={[ localisation, setLocalisation ]}>
      {children}
    </FiltersLocalisationContext.Provider>
  )
}

export default FilterLocalisationProvider;

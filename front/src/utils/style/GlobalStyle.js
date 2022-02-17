import { useContext } from 'react'
import {createGlobalStyle} from "styled-components";
import {ThemeContext} from "../context/Theme";

export function GlobalStyle() {
  const { theme } = useContext(ThemeContext)

  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}


const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
 
    body {
        background-color: ${({ isDarkMode }) => (isDarkMode ? '#383737' : '#dadada')};
        color: ${({ isDarkMode }) => (isDarkMode ? '#dadada' : 'black')};
        margin: 0;  
    }
`

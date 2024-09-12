import { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lighTheme } from "@/styles";
import { AppThemeContextProps } from "@/types";

export const AppThemeContext = createContext<AppThemeContextProps | undefined> (undefined)

export  const AppThemeProvaider = ({children}: {children: ReactNode}) => {
  const savedTheme = localStorage.getItem('theme')
  const [appTheme, setAppTheme] = useState(savedTheme?? 'light')

  const toggleTheme =() => {
    setAppTheme((prevTheme)=>( prevTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(()=>{
    localStorage.setItem('theme', appTheme)
  })

  return (
    <AppThemeContext.Provider value={{ appTheme, toggleTheme }}>
      <ThemeProvider theme={appTheme === 'light' ? lighTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  )
}
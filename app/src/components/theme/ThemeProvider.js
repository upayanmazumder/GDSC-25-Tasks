import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import {
  lightTheme,
  darkTheme,
  seaTheme,
  forestTheme,
  pastelTheme,
  sunsetTheme,
  winterTheme,
  autumnTheme,
  spaceTheme,
  retroTheme,
  cyberpunkTheme,
  monochromeTheme,
  neonTheme,
  coffeeTheme,
  natureTheme,
  oceanTheme,
  desertTheme,
  arcticTheme,
  lavaTheme,
  amethystTheme,
} from "./themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const themeObject = {
    light: lightTheme,
    dark: darkTheme,
    sea: seaTheme,
    forest: forestTheme,
    pastel: pastelTheme,
    sunset: sunsetTheme,
    winter: winterTheme,
    autumn: autumnTheme,
    space: spaceTheme,
    retro: retroTheme,
    cyberpunk: cyberpunkTheme,
    monochrome: monochromeTheme,
    neon: neonTheme,
    coffee: coffeeTheme,
    nature: natureTheme,
    ocean: oceanTheme,
    desert: desertTheme,
    arctic: arcticTheme,
    lava: lavaTheme,
    amethyst: amethystTheme,
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider theme={themeObject[theme]}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

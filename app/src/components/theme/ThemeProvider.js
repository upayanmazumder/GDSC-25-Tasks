import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme, seaTheme, forestTheme } from "./themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const themeObject = {
        light: lightTheme,
        dark: darkTheme,
        sea: seaTheme,
        forest: forestTheme,
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

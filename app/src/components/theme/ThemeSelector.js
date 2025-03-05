import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const ThemeButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  padding: 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ThemeSelector = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div>
            <ThemeButton onClick={() => setTheme("light")}>Light</ThemeButton>
            <ThemeButton onClick={() => setTheme("dark")}>Dark</ThemeButton>
            <ThemeButton onClick={() => setTheme("sea")}>Sea</ThemeButton>
            <ThemeButton onClick={() => setTheme("forest")}>Forest</ThemeButton>
            {/* Add more theme buttons as needed */}
        </div>
    );
};

export default ThemeSelector;

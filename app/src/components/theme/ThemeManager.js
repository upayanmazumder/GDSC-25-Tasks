import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from "styled-components";
import { FaPalette } from "react-icons/fa";
import styles from "./ThemeManager.module.css";

const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color};
        transition: background 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.2s linear;
    }
`;

const themes = {
  light: { background: "#ffffff", color: "#000000" },
  dark: { background: "#121212", color: "#ffffff" },
  pastel: { background: "#ffebcd", color: "#5d5d5d" },
  nature: { background: "#a8dadc", color: "#1d3557" },
  ocean: { background: "#0077b6", color: "#caf0f8" },
  sunset: { background: "#ff6f61", color: "#2d3436" },
  coffee: { background: "#6f4e37", color: "#f5f5dc" },
  neon: { background: "#0f0", color: "#000" },
  cyberpunk: { background: "#ff007f", color: "#0c0032" },
  monochrome: { background: "#555", color: "#eee" },
  amethyst: { background: "#9966cc", color: "#f0e6f6" },
  lava: { background: "#ff4500", color: "#1a1a1a" },
};

const moodToTheme = {
  Happy: "pastel",
  Calm: "nature",
  Adventurous: "ocean",
  Romantic: "sunset",
  Cozy: "coffee",
  Excited: "neon",
  Mysterious: "cyberpunk",
  Focused: "monochrome",
  Dreamy: "amethyst",
  Energetic: "lava",
};

const ThemeContext = createContext();

const ThemeManager = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState(localStorage.getItem("mood") || "Happy");
  const theme = useMemo(() => themes[moodToTheme[selectedMood] || "dark"], [selectedMood]);

  useEffect(() => {
    localStorage.setItem("mood", selectedMood);
  }, [selectedMood]);

  return (
    <ThemeContext.Provider value={{ selectedMood, setSelectedMood }}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const MoodSelector = () => {
  const { selectedMood, setSelectedMood } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.moodWidget} ${isOpen ? styles.open : ""}`}>
      <button className={styles.moodButton} onClick={() => setIsOpen(!isOpen)} aria-label="Select Mood">
        <FaPalette size={15} />
      </button>
      <div className={styles.moodContainer}>
        <label htmlFor="mood-selector" className={styles.moodLabel}>
          Select your mood:
        </label>
        <select
          id="mood-selector"
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          className={styles.moodSelect}
        >
          {Object.keys(moodToTheme).map((mood) => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { ThemeManager, MoodSelector };

import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from "styled-components";
import { FaPalette } from "react-icons/fa";
import styles from "./ThemeManager.module.css";

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

const moodToThemes = {
  Happy: ["pastel", "neon"],
  Calm: ["nature", "ocean"],
  Adventurous: ["ocean", "lava"],
  Romantic: ["sunset", "amethyst"],
  Cozy: ["coffee", "monochrome"],
  Excited: ["neon", "cyberpunk"],
  Mysterious: ["cyberpunk", "monochrome"],
  Focused: ["monochrome", "dark"],
  Dreamy: ["amethyst", "pastel"],
  Energetic: ["lava", "neon"],
};

const moodTransitions = {
  Happy: "background 0.5s ease-in-out, color 0.3s ease-in",
  Calm: "background 1s ease, color 0.6s ease",
  Adventurous: "background 0.7s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s ease-in-out",
  Romantic: "background 0.8s ease-in-out, color 0.4s ease",
  Cozy: "background 1.2s ease-in, color 0.6s linear",
  Excited: "background 0.4s linear, color 0.3s ease-in-out",
  Mysterious: "background 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s ease",
  Focused: "background 0.9s ease, color 0.5s ease-in",
  Dreamy: "background 1.5s ease-in-out, color 0.7s ease-in",
  Energetic: "background 0.4s ease-out, color 0.2s ease-in-out",
};

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: ${({ theme }) => moodTransitions[theme.mood] || "background 0.7s ease, color 0.3s ease"};
  }
`;

const ThemeContext = createContext();

const ThemeManager = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState(localStorage.getItem("mood") || "Happy");

  const theme = useMemo(() => {
    const themesForMood = moodToThemes[selectedMood] || ["dark"];
    return { ...themes[themesForMood[Math.floor(Math.random() * themesForMood.length)]], mood: selectedMood };
  }, [selectedMood]);

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
          {Object.keys(moodToThemes).map((mood) => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { ThemeManager, MoodSelector };
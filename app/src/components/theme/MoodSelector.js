import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeProvider";
import { FaPalette } from "react-icons/fa";
import "./MoodSelector.css";

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

const MoodSelector = () => {
  const { setTheme } = useContext(ThemeContext);
  const [selectedMood, setSelectedMood] = useState(
    localStorage.getItem("mood") || "Happy"
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const theme = moodToTheme[selectedMood] || "dark";
    setTheme(theme);
    localStorage.setItem("mood", selectedMood);
  }, [selectedMood, setTheme]);

  return (
    <div className={`mood-widget ${isOpen ? "open" : "closed"}`}>
      <button className="mood-button" onClick={() => setIsOpen(!isOpen)}>
        <FaPalette size={20} />
      </button>
      {isOpen && (
        <div className="mood-container">
          <label htmlFor="mood-selector" className="mood-label">
            Select your mood:
          </label>
          <select
            id="mood-selector"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="mood-select"
          >
            {Object.keys(moodToTheme).map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
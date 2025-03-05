import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import {
  FaPalette,
  FaCloudSun,
  FaSnowflake,
  FaLeaf,
  FaMeteor,
  FaHistory,
  FaRobot,
  FaRegLightbulb,
  FaCoffee,
  FaGlobeAmericas,
  FaWater,
  FaSun,
  FaIceCream,
  FaFire,
  FaGem,
  FaMoon, 
  FaTree 
} from "react-icons/fa";
import styles from "./ThemeSelector.module.css";

const ThemeSelector = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const themes = [
    { name: "light", icon: <FaSun /> },
    { name: "dark", icon: <FaMoon /> },
    { name: "sea", icon: <FaWater /> },
    { name: "forest", icon: <FaTree /> },
    { name: "pastel", icon: <FaPalette /> },
    { name: "sunset", icon: <FaCloudSun /> },
    { name: "winter", icon: <FaSnowflake /> },
    { name: "autumn", icon: <FaLeaf /> },
    { name: "space", icon: <FaMeteor /> },
    { name: "retro", icon: <FaHistory /> },
    { name: "cyberpunk", icon: <FaRobot /> },
    { name: "monochrome", icon: <FaRegLightbulb /> },
    { name: "neon", icon: <FaRegLightbulb /> },
    { name: "coffee", icon: <FaCoffee /> },
    { name: "nature", icon: <FaGlobeAmericas /> },
    { name: "ocean", icon: <FaWater /> },
    { name: "desert", icon: <FaSun /> },
    { name: "arctic", icon: <FaIceCream /> },
    { name: "lava", icon: <FaFire /> },
    { name: "amethyst", icon: <FaGem /> },
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsDialogOpen(false);
  };

  return (
    <div className={styles.themeSelector}>
      <button className={styles.selector} onClick={() => setIsDialogOpen(true)}>
        Change Theme ({theme})
      </button>

      {isDialogOpen && (
        <div className={styles.dialog}>
          <div className={styles.themeList}>
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => handleThemeChange(t.name)}
                className={styles.themeButton}
              >
                {t.icon} {t.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;

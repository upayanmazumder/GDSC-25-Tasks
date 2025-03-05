import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeProvider";
import { FaSun, FaMoon, FaWater, FaTree } from "react-icons/fa";
import styles from "./ThemeSelector.module.css";

const ThemeSelector = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const themes = [
        { name: "light", icon: <FaSun />, label: "Light" },
        { name: "dark", icon: <FaMoon />, label: "Dark" },
        { name: "sea", icon: <FaWater />, label: "Sea" },
        { name: "forest", icon: <FaTree />, label: "Forest" },
    ];

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setIsDialogOpen(false);
    };

    return (
        <>
            <button
                className={styles.themeButton}
                onClick={() => setIsDialogOpen(true)}
            >
                Change Theme
            </button>
            {isDialogOpen && (
                <div className={styles.dialog}>
                    <div className={styles.dialogContent}>
                        <h2>Select a Theme</h2>
                        <div className={styles.themeOptions}>
                            {themes.map((t) => (
                                <button
                                    key={t.name}
                                    className={`${styles.themeOption} ${
                                        theme === t.name ? styles.active : ""
                                    }`}
                                    onClick={() => handleThemeChange(t.name)}
                                >
                                    {t.icon}
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ThemeSelector;

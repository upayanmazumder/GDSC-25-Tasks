import React, { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import FooterStyles from "./Footer.module.css";

const Footer = () => {
    const [isLightTheme, setIsLightTheme] = useState(
        localStorage.getItem('theme') === 'light'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('light-theme', isLightTheme);
    }, [isLightTheme]);

    const toggleTheme = () => {
        setIsLightTheme((prev) => {
            const newTheme = !prev;
            localStorage.setItem('theme', newTheme ? 'light' : 'dark');
            document.documentElement.classList.toggle('light-theme', newTheme);
            return newTheme;
        });
    };

    return (
        <footer className={FooterStyles.footer}>
            <p>© 2025 Upayan</p>
            <button className={FooterStyles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme">
                {isLightTheme ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>
        </footer>
    );
};

export default Footer;

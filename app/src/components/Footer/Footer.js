import React, { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { IoDesktopOutline } from 'react-icons/io5';
import FooterStyles from "./Footer.module.css";

const Footer = () => {
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const applyTheme = (themeMode) => {
            if (themeMode === 'system') {
                document.documentElement.classList.toggle('light-theme', getSystemTheme() === 'light');
            } else {
                document.documentElement.classList.toggle('light-theme', themeMode === 'light');
            }
        };

        applyTheme(theme);

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const listener = (e) => applyTheme(e.matches ? 'dark' : 'light');
            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
        }
    }, [theme]);

    const setThemeMode = (mode) => {
        setTheme(mode);
        if (mode === 'system') {
            localStorage.removeItem('theme');
        } else {
            localStorage.setItem('theme', mode);
        }
    };

    return (
        <footer className={FooterStyles.footer}>
            <p>© 2025 Upayan</p>
            <div className={FooterStyles.themeContainer}>
                <button 
                    className={`${FooterStyles.themeToggle} ${theme === 'system' ? FooterStyles.active : ''}`} 
                    onClick={() => setThemeMode('system')} 
                    aria-label="Use System Theme"
                >
                    <IoDesktopOutline />
                </button>
                <button 
                    className={`${FooterStyles.themeToggle} ${theme === 'light' ? FooterStyles.active : ''}`} 
                    onClick={() => setThemeMode('light')} 
                    aria-label="Light Theme"
                >
                    <MdLightMode />
                </button>
                <button 
                    className={`${FooterStyles.themeToggle} ${theme === 'dark' ? FooterStyles.active : ''}`} 
                    onClick={() => setThemeMode('dark')} 
                    aria-label="Dark Theme"
                >
                    <MdDarkMode />
                </button>
            </div>
        </footer>
    );
};

export default Footer;

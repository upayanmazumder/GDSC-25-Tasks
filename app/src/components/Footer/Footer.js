import React from "react";
import ThemeSelector from "../theme/ThemeSelector";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>© 2025 Upayan</p>
            <ThemeSelector />
        </footer>
    );
};

export default Footer;

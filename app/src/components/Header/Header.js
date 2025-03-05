import headerStyles from "./Header.module.css";

const Header = () => {
    return (
        <header className={headerStyles.header}>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
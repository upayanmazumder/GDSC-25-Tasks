import { useAuth } from "../../Context/AuthContext";
import headerStyles from "./Header.module.css";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className={headerStyles.header}>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    {user ? (
                        <>
                            <li>Welcome, {user.username}</li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <li><a href="/login">Login</a></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;

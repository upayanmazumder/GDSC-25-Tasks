import { useAuth } from "../../Context/AuthContext";
import headerStyles from "./Header.module.css";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className={headerStyles.header}>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="https://github.com/upayanmazumder/GDSC-25-Tasks">Repository</a></li>
                </ul>
            </nav>
            <div className={headerStyles.auth}>
                {user ? (
                    <ul>
                        <li>Welcome, {user.username}</li>
                        <li><button onClick={logout}>Logout</button></li>
                    </ul>
                ) : (
                    <li><a href="/login">Login</a></li>
                )}
            </div>
        </header>
    );
}

export default Header;

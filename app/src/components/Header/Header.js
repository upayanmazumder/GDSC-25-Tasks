import { useAuth } from "../../Context/AuthContext";
import headerStyles from "./Header.module.css";
import { BsGithub, BsHouse } from "react-icons/bs";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className={headerStyles.header}>
            <nav>
                <ul>
                    <li><a href="/"><BsHouse /> Home</a></li>
                    <li><a href="https://github.com/upayanmazumder/GDSC-25-Tasks" target="_blank" rel="noreferrer"><BsGithub /> Repository</a></li>
                </ul>
            </nav>
            <div className={headerStyles.auth}>
                {user ? (
                    <ul>
                        <li>Welcome, <span className={headerStyles.username}>{user.username}</span></li>
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

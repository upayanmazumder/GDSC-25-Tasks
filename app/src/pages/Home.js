import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the Protected Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostFeed from "../components/PostFeed/PostFeed"

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main>
      <PostFeed />
    </main>
  );
};

export default Home;

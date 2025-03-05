import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PostContent from "./pages/PostContent";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/post/:postId" element={<PrivateRoute><PostContent /></PrivateRoute>} /> 
          <Route path="/profile/:userId" element={<PrivateRoute><ProfilePage /></PrivateRoute>} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

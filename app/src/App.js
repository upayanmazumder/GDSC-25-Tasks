import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PostContent from "./pages/PostContent";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/post/:postId" element={<PrivateRoute><PostContent /></PrivateRoute>} /> 
          <Route path="/profile/:userId" element={<PrivateRoute><ProfilePage /></PrivateRoute>} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

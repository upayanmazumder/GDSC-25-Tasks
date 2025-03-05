import { createContext, useContext, useState, useEffect } from "react";
import Header from "../components/Header/Header";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ username: "testuser" });
    }
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "password") {
      const fakeToken = "fake-jwt-token";
      localStorage.setItem("token", fakeToken);
      setUser({ username });
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Header />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

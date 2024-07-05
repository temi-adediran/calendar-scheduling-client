import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseService } from '../services/BaseService';

const AUTH_USER = "user";
const AUTH_TOKEN = "X-User-Token";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem(AUTH_USER);
    if (type && type !== "") setIsAuthenticated(type);
  }, []);

  const login = async (data) => {
    const type = data.user_type;

    try {
      const response = await BaseService.post("login", data, true);

      setIsAuthenticated(type);
      localStorage.setItem(AUTH_USER, `${type}`)
      navigate(`/${type}`);
    } catch (e) {
      console.log(e.message);
    }
  }

  const logout = () => {
    try {
      setIsAuthenticated("");
      sessionStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_USER);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
}

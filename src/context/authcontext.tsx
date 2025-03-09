// context/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("foodToken") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  const login = (newToken: string) => {
    Cookies.set("foodToken", newToken, { expires: 7 }); // 7 days expiry
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("foodToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = Cookies.get("foodToken");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

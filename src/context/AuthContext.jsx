import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_CREDENTIALS = {
  username: "Asmael",
  password: "Asmael010@#"
};

const AUTH_STORAGE_KEY = 'tecvexa_admin_session_v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.authenticated) {
          setUser(parsed);
        }
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const validUsername = username?.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase();
    const validPassword = password?.trim() === ADMIN_CREDENTIALS.password;

    if (validUsername && validPassword) {
      const sessionData = {
        username: "Asmael",
        name: "Ismail Mohamed (Showky)",
        role: "Chief Architect & Owner",
        authenticated: true,
        loginAt: new Date().toISOString()
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      setUser(sessionData);
      return { success: true };
    }

    return {
      success: false,
      error: "Invalid username or password"
    };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

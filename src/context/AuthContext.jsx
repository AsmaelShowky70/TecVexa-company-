import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateAdmin } from '../lib/storage';

const AuthContext = createContext();

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

  const login = async (username, password) => {
    const result = await authenticateAdmin(username, password);

    if (result.success && result.user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result.user));
      setUser(result.user);
      return { success: true };
    }

    return {
      success: false,
      error: result.error || "بيانات الدخول غير صحيحة"
    };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const refreshSessionUser = (updatedUserData) => {
    if (!user) return;
    const newSession = { ...user, ...updatedUserData };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newSession));
    setUser(newSession);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading, refreshSessionUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('edu_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('edu_token');
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('edu_token', token);
    localStorage.setItem('edu_user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('edu_token');
    localStorage.removeItem('edu_user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

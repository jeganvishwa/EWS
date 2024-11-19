import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
    if (storedUserData && storedUserData.zone && storedUserData.zone !== '') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (userData) => {
    sessionStorage.getItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('userData');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

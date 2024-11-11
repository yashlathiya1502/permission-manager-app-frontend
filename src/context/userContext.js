import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }); 

  const setUserData = (userData) => {
    setUser(userData);
  };

  const hasPermission = (permission) => {
    return user?.role[permission] ?? false;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUserData, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

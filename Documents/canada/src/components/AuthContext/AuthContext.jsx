import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ token: null, emailId: null });

  const saveAuthData = ({ token, emailId }) => {
    console.log("from AuthContext", token, emailId);
    setAuthData({ token, emailId });
  };

  return (
    <AuthContext.Provider value={{ authData, saveAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

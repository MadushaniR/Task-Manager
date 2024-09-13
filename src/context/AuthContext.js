import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // State to store the user

    const login = (username) => {
        setIsAuthenticated(true);
        setUser(username); // Set the username on login
    };
    
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); // Clear the user on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

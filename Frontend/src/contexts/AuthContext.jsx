// contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isInitialized: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'INITIALISE':
            const { isAuthenticated } = action.payload;
            return {
                ...state,
                isAuthenticated,
                isInitialized: true,
            };
        case 'SIGN_IN':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('login');
        const isAuthenticated = storedUser;

        dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated },
        });

        setIsInitialized(true);
    }, []);

    const login = () => {
        localStorage.setItem('login', true)
        dispatch({ type: 'SIGN_IN' });
    };

    const logout = () => {
        localStorage.setItem('login', false)
        dispatch({ type: 'SIGN_OUT' });
    };

    if (!isInitialized) {
        return null; // or a loading spinner
      }

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

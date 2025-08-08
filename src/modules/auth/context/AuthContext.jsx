import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAppStore } from '../../../store';

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {

    // Context value
    const contextValue = {
        
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
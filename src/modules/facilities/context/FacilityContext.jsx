import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAppStore } from '../../../store';

// Create Facility Context
const FacilityContext = createContext(null);

// Custom hook to use facility context
export const useFacilityContext = () => {
    const context = useContext(FacilityContext);
    if (!context) {
        throw new Error('useFacilityContext must be used within a FacilityProvider');
    }
    return context;
};

// Facility Provider Component
export const FacilityProvider = ({ children }) => {

    // Context value
    const contextValue = {
        
    };
    
    return (
        <FacilityContext.Provider value={contextValue}>
            {children}
        </FacilityContext.Provider>
    );
};

export default FacilityContext;
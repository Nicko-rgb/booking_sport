import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

// Import store slices
import { createReservationSlice } from '../modules/reservations/store/reservationStore';
import { createFacilitySlice } from '../modules/facilities/store/facilityStore';
import { createUserSlice } from '../modules/users/store/userStore';
import { createAdminSlice } from '../modules/admin/store/adminStore';
import { createAuthSlice } from '../modules/auth/store/authStore';


// Main store combining all module stores
export const useAppStore = create(
    devtools(
        persist(
            immer((set, get, api) => ({
                // Reservation module
                ...createReservationSlice(set, get, api),

                // Facility module
                ...createFacilitySlice(set, get, api),

                // User module
                ...createUserSlice(set, get, api),

                // Admin module
                ...createAdminSlice(set, get, api),

                // Auth module
                ...createAuthSlice(set, get, api),



                // Global actions that affect multiple modules
                resetAllStores: () => {
                    set((state) => {
                        // Reset all module states to initial values
                        const reservationSlice = createReservationSlice(set, get, api);
                        const facilitySlice = createFacilitySlice(set, get, api);
                        const userSlice = createUserSlice(set, get, api);
                        const adminSlice = createAdminSlice(set, get, api);
                        const authSlice = createAuthSlice(set, get, api);
                        
                        if (reservationSlice.reservations) state.reservations = reservationSlice.reservations;
                        if (facilitySlice.facilities) state.facilities = facilitySlice.facilities;
                        if (userSlice.user) state.user = userSlice.user;
                        if (adminSlice.admin) state.admin = adminSlice.admin;
                        if (authSlice.auth) state.auth = authSlice.auth;
                    });
                },



                // Cross-module actions
                initializeApp: async () => {
                    try {
                        const store = get();
                        


                        // Then initialize auth if available
                        if (store.initializeAuth) {
                            await store.initializeAuth();
                        }

                        // Load initial data based on auth state
                        if (store.auth && store.auth.isAuthenticated) {
                            const promises = [];
                            
                            if (store.loadUserData) promises.push(store.loadUserData());
                            if (store.loadFacilities) promises.push(store.loadFacilities());
                            
                            if (promises.length > 0) {
                                await Promise.all(promises);
                            }
                        }
                    } catch (error) {
                        console.error('Error initializing app:', error);
                    }
                }
            })),
            {
                name: 'booking-sport-storage',
                merge: (persistedState, currentState) => {
                    // Merge persisted state with current state, preserving non-persisted properties
                    return {
                        ...currentState,
                        ...persistedState,
                        auth: {
                            ...currentState.auth,
                            ...persistedState.auth
                        },
                        user: {
                            ...currentState.user,
                            ...persistedState.user
                        }
                    };
                },
                partialize: (state) => ({
                    // Only persist certain parts of the state
                    auth: {
                        isAuthenticated: state.auth.isAuthenticated,
                        user: state.auth.user,
                        token: state.auth.token
                    },
                    user: {
                        profile: state.user?.profile,
                        preferences: state.user?.preferences
                    }
                })
            }
        ),
        {
            name: 'booking-sport-store'
        }
    )
);

// Selectors for better performance
export const useReservationStore = () => useAppStore((state) => state.reservations);
export const useFacilityStore = () => useAppStore((state) => state.facilities);
export const useUserStore = () => useAppStore((state) => state.user);
export const useAdminStore = () => useAppStore((state) => state.admin);
export const useAuthStore = () => useAppStore((state) => state.auth);


// Cached selectors to prevent infinite loops
let cachedReservationActions = null;
let cachedFacilityActions = null;
let cachedUserActions = null;
let cachedAuthActions = null;

let cachedGlobalActions = null;

const reservationActionsSelector = (state) => {
    if (!cachedReservationActions || 
        cachedReservationActions.createReservation !== state.createReservation ||
        cachedReservationActions.updateReservation !== state.updateReservation ||
        cachedReservationActions.cancelReservation !== state.cancelReservation ||
        cachedReservationActions.loadReservations !== state.loadReservations) {
        cachedReservationActions = {
            createReservation: state.createReservation,
            updateReservation: state.updateReservation,
            cancelReservation: state.cancelReservation,
            loadReservations: state.loadReservations
        };
    }
    return cachedReservationActions;
};

const facilityActionsSelector = (state) => {
    if (!cachedFacilityActions ||
        cachedFacilityActions.loadFacilities !== state.loadFacilities ||
        cachedFacilityActions.searchFacilities !== state.searchFacilities ||
        cachedFacilityActions.selectFacility !== state.selectFacility ||
        cachedFacilityActions.loadFacilityDetails !== state.loadFacilityDetails) {
        cachedFacilityActions = {
            loadFacilities: state.loadFacilities,
            searchFacilities: state.searchFacilities,
            selectFacility: state.selectFacility,
            loadFacilityDetails: state.loadFacilityDetails
        };
    }
    return cachedFacilityActions;
};

const userActionsSelector = (state) => {
    if (!cachedUserActions ||
        cachedUserActions.loadUserData !== state.loadUserData ||
        cachedUserActions.updateUserProfile !== state.updateUserProfile ||
        cachedUserActions.updateUserPreferences !== state.updateUserPreferences) {
        cachedUserActions = {
            loadUserData: state.loadUserData,
            updateUserProfile: state.updateUserProfile,
            updateUserPreferences: state.updateUserPreferences
        };
    }
    return cachedUserActions;
};

const authActionsSelector = (state) => {
    if (!cachedAuthActions ||
        cachedAuthActions.login !== state.login ||
        cachedAuthActions.logout !== state.logout ||
        cachedAuthActions.register !== state.register ||
        cachedAuthActions.refreshToken !== state.refreshToken) {
        cachedAuthActions = {
            login: state.login,
            logout: state.logout,
            register: state.register,
            refreshToken: state.refreshToken
        };
    }
    return cachedAuthActions;
};



const globalActionsSelector = (state) => {
    if (!cachedGlobalActions ||
        cachedGlobalActions.resetAllStores !== state.resetAllStores ||
        cachedGlobalActions.initializeApp !== state.initializeApp) {
        cachedGlobalActions = {
            resetAllStores: state.resetAllStores,
            initializeApp: state.initializeApp
        };
    }
    return cachedGlobalActions;
};

// Action selectors
export const useReservationActions = () => useAppStore(reservationActionsSelector);
export const useFacilityActions = () => useAppStore(facilityActionsSelector);
export const useUserActions = () => useAppStore(userActionsSelector);
export const useAuthActions = () => useAppStore(authActionsSelector);

export const useGlobalActions = () => useAppStore(globalActionsSelector);
import React from 'react'
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
import './shared/styles/Toast.css'
import { ToastContainer } from 'react-toastify';

// Pages
import Home from "./pages/Home";
import Profile from './pages/Profile';
import Facilityes from './pages/Facilityes';
import SpaceSport from "./pages/SpaceSport";
import LoginRegister from './pages/LoginRegister';
import Admin from './pages/Admin';

// Toast Example
import ToastExample from './shared/components/ToastExample';

// Components
import ScrollToTop from './shared/components/ui/ScrollToTop';

// Module Contexts
import { AuthProvider } from './modules/auth/context/AuthContext';
import { FacilityProvider } from './modules/facilities/context/FacilityContext';
import { ReservationProvider } from './modules/reservations/context/ReservationContext';

// Store initialization
import { useGlobalActions } from './store';
import { useEffect } from 'react';

const App = () => {
    const { initializeApp } = useGlobalActions();

    useEffect(() => {
        // Initialize the application store
        initializeApp();
    }, [initializeApp]);

    return (
        <BrowserRouter>
            <AuthProvider>
                <FacilityProvider />
                <ReservationProvider />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/facilityes" element={<Facilityes />} />
                    <Route path="/space-sport" element={<SpaceSport />} />
                    <Route path="/login" element={<LoginRegister />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/toast-example' element={<ToastExample />} />
                </Routes>
                <ToastContainer position="top-right" autoClose={3000} />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App

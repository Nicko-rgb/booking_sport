import React from 'react'
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Facilityes from './pages/Facilityes';
import SpaceSport from "./pages/SpaceSport";
import LoginRegister from './pages/LoginRegister';
import ScrollToTop from './components/ui/ScrollToTop';

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/facilityes" element={<Facilityes />}/>
                <Route path="/space-sport" element={<SpaceSport />} />
                <Route path="/login" element={<LoginRegister /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App

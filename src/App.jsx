import React from 'react'
import Home from "./pages/home";
import SpaceSport from "./pages/SpaceSport";
import LoginRegister from './pages/LoginRegister'
// import Header from './components/layout/header/Header';
// import Footer from './components/layout/footer/Footer';
import Main from './components/layout/main/main';
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';



// Inicializacion de la Aplicacion
const App = () => {
    return (
        // <div>
        <BrowserRouter>
            {/* <Header/> */}
            <Routes>
                <Route path="/" element={<Main component={<Home id="simio" />}></Main>} />
                <Route path="/space-sport" element={<Main component={<SpaceSport />}></Main>} />
                <Route path="/login" element={<Main component={<LoginRegister />}></Main>} />
            </Routes>
            {/* <Footer/> */}
        </BrowserRouter>


    )
}

export default App

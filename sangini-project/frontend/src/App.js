import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom"
import CustomAppBar from './components/AppBar/CustomAppBar';

import Home from './components/Home/Home';

import Dashboard from './components/Dashboard/Dashboard';

import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Themes/RNAThemes';
import { getAuthToken, removeAuthToken, setAuthToken } from './api/jwt';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { CssBaseline } from '@mui/material';

import Footer from './components/Footer/Footer';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());
    console.log(isLoggedIn);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        removeAuthToken();
        return (navigate("/", { replace: true }));
    }
    
    const handleSignupOrLogin = (token) => {
        setAuthToken(token);
        setIsLoggedIn(true);
        return (navigate("/dashboard", { replace: true }));
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CustomAppBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
                        <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin} isLoggedIn={isLoggedIn}/>} />
                        <Route path="/signup" element={<Signup handleSignupOrLogin={handleSignupOrLogin} isLoggedIn={isLoggedIn}/>} />
                        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn}/>} />
                    </Routes>
                    {/* <Footer /> */}
                </div>
            </ThemeProvider>
        </>
    )    
};

export default App;

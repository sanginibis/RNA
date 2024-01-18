import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom"
import CustomAppBar from './components/AppBar/CustomAppBar';

import Home from './components/Home/Home';

import Dashboard from './components/Dashboard/Dashboard';

import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Themes/RNAThemes';
import LoginOrSignUp from './components/LoginOrSignup/LoginOrSignup';
import { getAuthToken, removeAuthToken, setAuthToken } from './api/jwt';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());

    const navigate = useNavigate();
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        removeAuthToken();
        return (navigate("/", { replace: true }));
    }
    
    const handleSignupOrLogin = (token) => {
        console.log('token ', token)
        setAuthToken(token);
        setIsLoggedIn(true);
        return (navigate("/dashboard", { replace: true }));
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CustomAppBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<LoginOrSignUp handleSignupOrLogin={handleSignupOrLogin} />} />
                    </Routes>
                    {/* <Footer /> */}
                </div>
            </ThemeProvider>
        </>
    )    
};

export default App;

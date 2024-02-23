import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom"
import CustomAppBar from './components/AppBar/CustomAppBar';

import Home from './components/Home/Home';

import Dashboard from './components/Dashboard/Dashboard';

import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Themes/RNAThemes';
import { getAuthToken, removeAuthToken, setAuthToken } from './api/authenticationToken';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { CssBaseline } from '@mui/material';

import Footer from './components/Footer/Footer';
import {withLogin,withoutLogin} from './services/app-route-handler';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());
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

    const LoginElement = () => <Login handleSignupOrLogin={handleSignupOrLogin}/>;
    const SignupElement = () => <Signup handleSignupOrLogin={handleSignupOrLogin}/>;

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CustomAppBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home isLoggedin={isLoggedIn} />} />
                        <Route path="/login" element={withoutLogin(LoginElement)} />
                        <Route path="/signup" element={withoutLogin(SignupElement)} />
                        <Route path="/dashboard" element={withLogin(Dashboard)} />
                    </Routes>
                    <Footer />
                </div>
            </ThemeProvider>
        </>
    )    
};

export default App;

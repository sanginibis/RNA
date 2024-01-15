import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom"
import CustomAppBar from './components/AppBar/CustomAppBar';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

// import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import { loggedInPages, loggedOutPages } from './config/navigation'

import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Themes/RNAThemes';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        // Logic for logout
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CustomAppBar loggedInPages={loggedInPages} loggedOutPages={loggedOutPages} settingsPages={[]} isLoggedIn={true} handleLogout={handleLogout}  />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                    {/* <Footer /> */}
                </div>
            </ThemeProvider>
        </>
    )    
};

export default App;

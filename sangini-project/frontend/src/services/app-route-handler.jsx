
import React, { useState, useEffect, Component } from 'react';
import { getAuthToken } from '../api/authenticationToken';
import { Navigate } from 'react-router-dom';



function loggedInStatus() {
    if(getAuthToken()===null || getAuthToken()===undefined){
        return false;
    } else {
        return true;
    }
}

const withLogin = (Component, props) => {
    return loggedInStatus()===true ? <Component {...props} /> : <Navigate to={'/'} replace />;
}

const withoutLogin = (Component, props) => {
    return loggedInStatus()===false ? <Component {...props} /> : <Navigate to={'/dashboard'} replace />;
}

export {withLogin, withoutLogin};
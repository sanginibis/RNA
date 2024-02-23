import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Title from '../Title/Title';
import { loginAPI } from '../../api/login';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';

import {useFormik} from "formik";

// regex for email and password validations
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// validate the input fields
const validate =  values => {

  const errors = {}; // initialise the errors
  const isRequired = false;

  if (!values.email) errors.email = isRequired;
  if (!values.password) errors.password = isRequired;
  if (!emailRegex.test(values.email)) errors.email = isRequired;

  return errors;

};

export default function Login({handleSignupOrLogin}) {

  // initialise the formik hook - note here formik is used to handle the submission of the form
  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validate,
    onSubmit: async(values, {resetForm}) => {
      console.log(values);

      // setup the data
      const loginData = {
        "username" : values.email,
        "password" : values.password,
      };

      // call the api
      const response = await loginAPI(loginData);
console.log(response);
      // handle the response
      if (response.err_no>0){
        alert(response.message);
      } else {
        // make sure the user is taken to dashboard
        handleSignupOrLogin(response.data.token);
      }

    },
  });
    
  return (
    <Container style={{
      width: '30%',
      paddingTop: '120px',
    }}>
      <form onSubmit={formik.handleSubmit}>

    <div style={{
      display:'flex', 
      flexDirection:'column', 
      justifyContent:'center',
      alignItems:'center',
      border:'1px solid',
      borderRadius: '15px',
      borderColor: '#D3D3D3',
      padding: '30px',
      width:'100%'
      }}
      >

      {/* the login icon */}
      <Avatar sx={{bgcolor: 'primary.main'}}>
        <LockOutlinedIcon />
      </Avatar>

      {/* the login title */}
      <div style={{
      display:'flex', 
      flexDirection:'column', 
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: '30px'
      }}>
        <Title>Login</Title>
      </div>

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoFocus
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email ? true : false}
        />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password ? true : false}
        />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>

      <Link href="#" variant="body2">
        Forgot password?
      </Link>
    </div>
    </form>
    <div style={{display:'grid', flexDirection:'column', alignItems:'right', justifyContent:'right', paddingTop:'20px'}}>
      <Link href="/signup" variant="body1" >
          Don't have an account? Sign up
        </Link>
    </div>  
  </Container>
    
  );
}
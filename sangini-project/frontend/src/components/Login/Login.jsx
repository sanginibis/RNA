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

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$/;

export default function Login({handleSignupOrLogin}) {

  // --- EMail and Password input handling ---
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (value) => {
    setEmailError('');
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPasswordError('');
    setPassword(value);
  };

  const [errorMessage, setErrorMessage] = useState('');

  // on click of the button to signup
  const handleSubmit = async (event) => {

    let errorM = false;

    // validate
    if (!emailRegex.test(email)) {
      errorM = true;
      setEmailError('Email provided is not in correct format.');
    } else {
      setEmailError('');
    }

    if (!passwordRegex.test(password)) {
      errorM = true;
      setPasswordError('Password is required.');
    }
    else {
      setPasswordError('');
    }
    
    if (!errorM) {
      // setup the data
      const loginData = {
        "username" : email,
        "password" : password
      };

      // call the api
      const response = await loginAPI(loginData);

      // handle the response
      if (response.err_no>0){
        setErrorMessage(response.message);
      } else {
        // make sure the user is taken to dashboard
        handleSignupOrLogin(response.data.token);
      }
    };
  };  

  return (
    <Container style={{
      width: '30%',
      paddingTop: '120px',
    }}>
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
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        inputProps={{ maxLength: 100 }}
        error={emailError.length > 0 ? true : false} // Display error indicator if empty
        // helperText={emailError.length > 0 ? emailError : ''} // Add helper text   
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        inputProps={{ maxLength: 100 }}
        error={passwordError.length > 0 ? true : false} // Display error indicator if empty
        // helperText={passwordError.length > 0 ? passwordError : ''} // Add helper text   
      />
      {
        errorMessage.length > 0 ? <Typography style={{color:'red', alignSelf:'center'}}>{errorMessage}</Typography> : ''
      }

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={(e)=>handleSubmit(e)}
      >
        Sign In
      </Button>

      <Link href="#" variant="body2">
        Forgot password?
      </Link>
    </div>
    <div style={{display:'grid', flexDirection:'column', alignItems:'right', justifyContent:'right', paddingTop:'20px'}}>
      <Link href="/signup" variant="body1" >
          Don't have an account? Sign up
        </Link>
    </div>  
  </Container>
    
  );
}
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Title from '../../Title/Title';
import { loginAPI } from '../../../api/login';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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

    if (password.length===0) {
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
    <Grid item xs={12} sm={2} md={8}>
        <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Title>If you have an account then</Title>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                helperText={emailError.length > 0 ? emailError : ''} // Add helper text   
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
                helperText={passwordError.length > 0 ? passwordError : ''} // Add helper text   
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
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
  );
}
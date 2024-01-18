import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import Title from '../../Title/Title';
import { signUpAPI } from '../../../api/signUp';

const fieldNames = {
  firstName: 'firstName',
  lastName: 'lastName',
  emailSignup: 'emailSignup',
  passwordSignup: 'passwordSignup',
  organisation: 'organisation',
  accepted: 'accepted'
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$/;

export default function Signup({handleSignupOrLogin}) {

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


  // when i accept is clicked
  const [iAccept, setIAccept] = useState(false);
  const onIAcceptClicked = (event) => {
    setIAccept(!iAccept);
  }

  const [errorMessage, setErrorMessage] = useState('');
  
  // on click of the button to signup
  const handleSubmit = async (event) => {

    let errorM = '';

    // get all the values
    const firstName = document.getElementById(fieldNames.firstName).value.trim();
    const lastName = document.getElementById(fieldNames.lastName).value.trim();
    const organisation = document.getElementById(fieldNames.organisation).value.trim();
    const accepted = document.getElementById(fieldNames.accepted).value;

    if (firstName.length===0) errorM = errorM + 'First Name, ';
    if (lastName.length===0) errorM = errorM + 'Last Name, ';

    if (!emailRegex.test(email)) {
      errorM = errorM + 'Email ';
      setEmailError('Email provided is not in correct format.');
    } else {
      setEmailError('');
    }

    if (!passwordRegex.test(password)) {
      errorM = errorM + 'Password ';
      setPasswordError('Password requires atleast 1 Upper, 1 Number, 1 Special and minimum 8 characters.');
    }
    else
      setPasswordError('');
    
    if (organisation.length===0) errorM = errorM + 'School or University, ';
    if (accepted==='false') errorM = errorM + 'I accept,  ';

    if (errorM.length>0) errorM = errorM + ' is/are required fields.';
    setErrorMessage(errorM);

    if (errorM.length===0) {
      // setup the data
      const signupData = {
        "firstname" : firstName,
        "lastname" : lastName,
        "username" : email,
        "password" : password,
        "organisation": organisation,
        "accepted" : accepted==='false'? 'N':'Y'
      };

      // call the api
      const response = await signUpAPI(signupData);

      // handle the response
      if (response.err_no>0){
        setErrorMessage(response.message);
      } else {
        // make sure the user is taken to dashboard
        handleSignupOrLogin(response.data.token);
      }
    }
  };
  
  return (

        <Grid item xs={12} sm={2} md={9}>
        <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:'center'
                }}
            >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          
          <Title>If you do not have an account then</Title>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  name={fieldNames.firstName}
                  id={fieldNames.firstName}
                  label="First Name"
                  required
                  fullWidth
                  autoFocus  
                  // error={errorMessage.length > 0 ? true : false} // Display error indicator if empty
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name={fieldNames.lastName}
                  id={fieldNames.lastName}
                  label="Last Name"
                  required
                  fullWidth
                  autoFocus  
                  // error={errorMessage.length > 0 ? true : false} // Display error indicator if empty
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name={fieldNames.emailSignup}
                  id={fieldNames.emailSignup}
                  label="Email Address"
                  required
                  fullWidth
                  autoFocus  
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  inputProps={{ maxLength: 100 }}
                  error={emailError.length > 0 ? true : false} // Display error indicator if empty
                  helperText={emailError.length > 0 ? emailError : ''} // Add helper text   
                  />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name={fieldNames.passwordSignup}
                  id={fieldNames.passwordSignup}
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  autoFocus  
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  inputProps={{ maxLength: 100 }}
                  error={passwordError.length > 0 ? true : false} // Display error indicator if empty
                  helperText={passwordError.length > 0 ? passwordError : ''} // Add helper text   
                  />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name={fieldNames.organisation}
                  id={fieldNames.organisation}
                  label="School, University"
                  required
                  fullWidth
                  autoFocus  
                  // error={errorMessage.length > 0 ? true : false} // Display error indicator if empty
                  />
              </Grid>
              
              <Grid item xs={12}>
                  <div style={{display:'flex', flexDirection:'row'}}>
                    <Checkbox 
                      name={fieldNames.accepted}
                      id={fieldNames.accepted}
                      value={iAccept}
                      color="primary"
                      onClick={(e)=>onIAcceptClicked(e)}
                      />
                    <Typography style={{marginTop:'10px'}}>I accept to be registered.</Typography>
                  </div>
              </Grid>

            </Grid>
            {
              errorMessage.length > 0 ? <Typography style={{color:'red', alignSelf:'center'}}>{errorMessage}</Typography> : ''
            }
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>handleSubmit(e)}
            >
              Sign Up
            </Button>

          </Box>
        </Paper>
        </Grid>
  );
}
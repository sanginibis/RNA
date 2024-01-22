import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Title from '../Title/Title';
import { signUpAPI } from '../../api/signUp';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';

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

    <Container style={{
      width: '30%',
      paddingTop: '80px',
    }}>
      <div style={{
        display:'flex', 
        flexDirection:'column', 
        justifyContent:'center',
        alignItems:'center',
        border:'1px solid',
        borderRadius: '15px',
        borderColor: '#D3D3D3',
        padding: '20px',
        width:'100%'
        }}
        >

          {/* the login icon */}
          <Avatar sx={{bgcolor: 'primary.main'}}>
            <PersonIcon />
          </Avatar>

          {/* the sign up title */}
          <div style={{
          display:'flex', 
          flexDirection:'column', 
          justifyContent:'center',
          alignItems:'center',
          paddingBottom: '10px'
          }}>
            <Title>Sign up</Title>
          </div>

          <div style={{
          display:'flex', 
          flexDirection:'row', 
          justifyContent:'center',
          alignItems:'center',
          columnGap: '5px'
          }}>
            <TextField
              margin="normal"
              name={fieldNames.firstName}
              id={fieldNames.firstName}
              label="First Name"
              required
              fullWidth
              autoFocus  
            />
            <TextField
              margin="normal"
              name={fieldNames.lastName}
              id={fieldNames.lastName}
              label="Last Name"
              required
              fullWidth
              autoFocus  
            />
          </div>
            
          <TextField
            margin="normal"
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

          <TextField
            margin="normal"
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
          <TextField
            margin="normal"
            name={fieldNames.organisation}
            id={fieldNames.organisation}
            label="School, University"
            required
            fullWidth
            autoFocus  
            />

            <div style={{display:'flex', flexDirection:'row', alignItems:'left', justifyContent:'left', width:'100%'}}>
              <Checkbox 
                name={fieldNames.accepted}
                id={fieldNames.accepted}
                value={iAccept}
                color="primary"
                onClick={(e)=>onIAcceptClicked(e)}
                />
              <Typography style={{marginTop:'10px'}}>I accept to be registered.</Typography>
            </div>

            {
              errorMessage.length > 0 ? <Typography style={{color:'red', alignSelf:'center'}}>{errorMessage}</Typography> : ''
            }

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2}}
              onClick={(e)=>handleSubmit(e)}
            >
              Sign Up
            </Button>

      </div>

    <div style={{display:'grid', flexDirection:'column', alignItems:'right', justifyContent:'right', paddingTop:'20px'}}>
      <Link href="/login" variant="body1" >
          Already have an account? Login
        </Link>
    </div>  
  </Container>


  );
}
import React  from 'react';

import {
  Avatar,
  Button,
  TextField,
  Checkbox,
  Typography,
  Link,
  Container
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import {useFormik} from "formik";

import Title from '../Title/Title';
import { signUpAPI } from '../../api/signUp';


// regex for email and password validations
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$/;

// validate the input fields
const validate =  values => {

  const errors = {}; // initialise the errors
  const isRequired = false;

  if (!values.firstName) errors.firstName = isRequired;
  if (!values.lastName) errors.lastName = isRequired;
  if (!emailRegex.test(values.email)) errors.email = isRequired;
  if (!passwordRegex.test(values.password)) errors.password = isRequired;
  if (!values.organisation) errors.organisation = isRequired;
  if (!values.iAccept) errors.iAccept = isRequired;

  return errors;

};

export default function Signup({handleSignupOrLogin}) {

  // initialise the formik hook - note here formik is used to handle the submission of the form
  const formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      iAccept: false
    },
    validate,
    onSubmit: async(values, {resetForm}) => {
      console.log(values);

      // setup the data
      const signupData = {
        "firstname" : values.firstName,
        "lastname" : values.lastName,
        "username" : values.email,
        "password" : values.password,
        "organisation": values.organisation,
        "accepted" : values.iAccept? 'Y':'N'
      };

      // call the api
      const response = await signUpAPI(signupData);

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
      paddingTop: '100px',
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
                name='firstName'
                id='firstName'
                label="First Name"
                required
                fullWidth
                autoFocus  
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && formik.errors.firstName ? true : false}
              />
              <TextField
                margin="normal"
                name='lastName'
                id='lastName'
                label="Last Name"
                required
                fullWidth
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={formik.touched.lastName && formik.errors.lastName ? true : false}
              />
            </div>
              
            <TextField
              margin="normal"
              name='email'
              id='email'
              label="Email Address"
              required
              fullWidth
              autoFocus  
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email ? true : false}
              />

            <TextField
              margin="normal"
              name='password'
              id='password'
              label="Password (Minimum 8, Atleast 1 Upper, 1 Number, 1 Special)"
              type="password"
              required
              fullWidth
              autoFocus  
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password ? true : false}
              />
            <TextField
              margin="normal"
              name='organisation'
              id='organisation'
              label="School, University"
              required
              fullWidth
              autoFocus  
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.organisation}
              error={formik.touched.organisation && formik.errors.organisation ? true : false}
              />

              <div style={{display:'flex', flexDirection:'row', alignItems:'left', justifyContent:'left', width:'100%'}}>
                <Checkbox 
                  name='iAccept'
                  id='iAccept'
                  color="primary"
                  value={!formik.values.iAccept}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  style={formik.errors.iAccept ? {color: 'red'} : {color: 'primary'} }
                  />
                <Typography style={{marginTop:'10px'}}>I accept to be registered.</Typography>
              </div>

              <Button
                type='submit'
                fullWidth
                variant="contained"
                sx={{ mt: 2}}
              >
                SignUp
              </Button>

        </div>
    </form>

    <div style={{display:'grid', flexDirection:'column', alignItems:'right', justifyContent:'right', paddingTop:'20px'}}>
      <Link href="/login" variant="body1" >
          Already have an account? Login
        </Link>
    </div>  
  </Container>


  );
}
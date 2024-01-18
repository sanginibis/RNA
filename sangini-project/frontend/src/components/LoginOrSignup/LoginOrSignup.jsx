import * as React from 'react';

import Grid from '@mui/material/Grid';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function LoginOrSignUp({handleSignupOrLogin}) {

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '80px' }}>
        <CssBaseline />
        <Container style={{alignItems:'center'}}>
            <Grid container spacing={1}>
              <Grid item xs={6} style={{marginTop:'80px'}}>
                  <Login handleSignupOrLogin={handleSignupOrLogin} />
              </Grid>
              <Grid item xs={6}>
                  <Signup handleSignupOrLogin={handleSignupOrLogin}/>
              </Grid>
            </Grid>
        </Container>
    </Box>
  );
}
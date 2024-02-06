import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  MenuItem,
  Divider,
  Tooltip
} from '@mui/material';

import BiotechIcon from '@mui/icons-material/Biotech'; // logo
import DashboardIcon from '@mui/icons-material/Dashboard'; // dashboard
import PersonIcon from '@mui/icons-material/Person'; // profile
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt'; // credits
import LogoutIcon from '@mui/icons-material/Logout'; // logout

import { yellow } from '@mui/material/colors';

/* 
This custom app bar will be used througout the application as a standard navigation.
*/

function CustomAppBar({isLoggedIn, handleLogout, onItemSelected}) {
  const [openHelp, setOpenHelp] = useState(false);
  const [openTestRNAs, setOpenTestRNAs] = useState(false);

  const navigate = useNavigate();

  const loggedInMenu = () => {
    return (
      <div style={{position:'absolute', right:'30px', top: '5px'}}>

          <div style ={{display: "flex", flexDirection:'row', justifyContent:'space-evenly'}}>
            <Tooltip title={'dashboard'} placement='bottom' >
              <IconButton onClick={(e)=>navigate("/dashboard", { replace: true })} style={{background:'var(--primary-color)'}}>
                <Avatar>
                  <DashboardIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            &nbsp;
            <Tooltip title={'profile'} placement='bottom'>
              <IconButton onClick={(e)=>navigate("/profile", { replace: true })} style={{background:'var(--primary-color)'}}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            &nbsp;
            <Tooltip title={'credits'} placement='bottom'>
              <IconButton onClick={(e)=>navigate("/credits", { replace: true })} style={{background:'var(--primary-color)'}}>
                <Avatar>
                  <PsychologyAltIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            &nbsp;
            <Tooltip title={'logout'} placement='bottom'>
              <IconButton onClick={(e)=>handleLogout()} style={{background:'var(--primary-color)'}}>
                <Avatar>
                  <LogoutIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </div>

      </div>
    );
  }  

  const loggedOutMenu = () => {
    return (
      <>
        <MenuItem key='login' onClick={(e)=>navigate("/login", { replace: true })}>
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Login</Typography>
        </MenuItem>
        <MenuItem key='signup'onClick={(e)=>navigate("/signup", { replace: true })}>
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Sign up</Typography>
        </MenuItem>
      </>
    );
  }

  // render the app bar menu items
  const renderMenuItems = () => {
    if (isLoggedIn){
      return loggedInMenu();
    } else {
      return loggedOutMenu();
    }
  };  


  // now return the design of the menu
  return (

    <AppBar component="nav">

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BiotechIcon sx={{ mr: 1, fontSize: 50, color:yellow[500] }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:yellow[500],
              textDecoration: 'none',
            }}
          >
            RNA BioInfo
          </Typography>

          {/* ------------------------------------------------------------------------ */}
          {/* Show the menu */}
          {/* ------------------------------------------------------------------------ */}          
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            {renderMenuItems()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomAppBar;
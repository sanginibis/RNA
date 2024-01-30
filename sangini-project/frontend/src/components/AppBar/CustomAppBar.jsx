import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { green, yellow } from '@mui/material/colors';

/* 
This custom app bar will be used througout the application as a standard navigation.
*/

function CustomAppBar({isLoggedIn, handleLogout}) {
  const navigate = useNavigate();

  // menu click events
  const loginClick = (e) => {
    return (navigate("/login", { replace: true }));
  }

  const signupClick = (e) => {
    return (navigate("/signup", { replace: true }));
  }

  const dashboardClick = (e) => {
    return (navigate("/dashboard", { replace: true }));
  }

  const profileClick = (e) => {
    return (navigate("/profile", { replace: true }));
  }

  const creditsClick = (e) => {
    return (navigate("/credits", { replace: true }));
  }

  const logoutClick = (e) => {
    handleLogout();
  }

  // if logged in
  const loggedInMenu = () => {
    return (
      <>
        <MenuItem
          key='dashboard'
          onClick={(e)=>dashboardClick(e)}
        >
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Dashboard</Typography>
        </MenuItem>
        <MenuItem
          key='profile'
          onClick={(e)=>profileClick(e)}
        >
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Profile</Typography>
        </MenuItem>
        <MenuItem
          key='credits'
          onClick={(e)=>creditsClick(e)}
        >
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Credits</Typography>
        </MenuItem>
        <MenuItem
          key='logout'
          onClick={(e)=>logoutClick(e)}
        >
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Logout</Typography>
        </MenuItem>
      </>
    );
  }
  
  const loggedOutMenu = () => {
    return (
      <>
        <MenuItem
          key='login'
          onClick={(e)=>loginClick(e)}
        >
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Login</Typography>
        </MenuItem>
        <MenuItem
          key='signup'
          onClick={(e)=>signupClick(e)}
        >
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Sign up</Typography>
        </MenuItem>
        <MenuItem
          key='credits'
          onClick={(e)=>creditsClick(e)}
        >
          <Typography textAlign="center" sx={{color: "#ffffff"}} >Credits</Typography>
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

          {/* ------------------------------------------------------------------------ */}
          {/* Show the person as green if logged in */}
          {/* ------------------------------------------------------------------------ */}          
          <Box sx={{ flexGrow: 0 }}>
              <IconButton>
                {isLoggedIn ?
                  <Avatar sx={{ bgcolor: green[500] }}>
                    <PersonIcon />
                  </Avatar>
                  :
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                }
              </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomAppBar;
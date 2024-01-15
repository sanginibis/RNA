import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { green, yellow } from '@mui/material/colors';


// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


/* 
This custom app bar will be used througout the application as a standard navigation.

It accepts the top bar pages navigation as a data property.
If a settings menu is required then it accepts it as as a data property.
The structure of the data property for pages or settings should be in the following format:
pages = [
  "Name":"", "NavigateTo":""
]

In addition to the above data properties, it also accepts the login status as isLoggedIn and 
logout function as handleLogout.
*/

function CustomAppBar({loggedInPages, loggedOutPages, settingsPages, isLoggedIn, handleLogout}) {

  // below is the handling of the menu clicks in different state i.e. responsive states
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [menuItems, setMenuItems] = React.useState(loggedOutPages);
  // const [dropMenuItems, setDropMenuItems] = React.useState(loggedOutPages);

  // this is invoked when the menu is opened in a state when the screen is small like a phone
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  // this is the settings invoked when the menu is opened in a state when the screen is small like a phone
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // this is invoked when the menu is opened in a state when the screen is bigger
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // this is the settings invoked when the menu is opened in a state when the screen is bigger
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  // set the menu items depending on login state
  const getMenuItems = () => {
    return isLoggedIn ? loggedInPages : loggedOutPages;
  };

  // render the app bar menu items
  const renderMenuItems = () => {
    const menuItems = getMenuItems();
    return menuItems.map((page) => (
      <MenuItem
        key={page.Name}
        onClick={handleCloseNavMenu}
        component={Link}
        to={page.NavigateTo}
      >
        <Typography textAlign="center" sx={{color: "#ffffff"}} >{page.Name}</Typography>
      </MenuItem>
    ));
  };  

  // render the drop down menu items
  const renderDropMenuItems = () => {
    const menuItems = getMenuItems();
    return menuItems.map((page) => (
      <MenuItem
        key={page.Name}
        onClick={handleCloseNavMenu}
        component={Link}
        to={page.NavigateTo}
      >
        <Typography textAlign="center">{page.Name}</Typography>
      </MenuItem>
    ));
  };  

  // now return the design of the menu
  return (

    <AppBar component="nav">

      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* ------------------------------------------------------------------------ */}
          {/* This section is when the full menu is shown i.e. the screen size is BIG */}
          {/* ------------------------------------------------------------------------ */}
          <BiotechIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 50, color:yellow[500] }} />
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {renderDropMenuItems()}
            </Menu>
          </Box>

          {/* ------------------------------------------------------------------------ */}
          {/* This section is when the full menu is shown i.e. the screen size is SMALL */}
          {/* ------------------------------------------------------------------------ */}          
          <BiotechIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: 50, color:yellow[500] }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:yellow[500],
              textDecoration: 'none',
            }}
          >
            RNA BioInfo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {renderMenuItems()}
            
          </Box>

          {/* ------------------------------------------------------------------------ */}
          {/* This section is the settings section */}
          {/* ------------------------------------------------------------------------ */}          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsPages?settingsPages.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              )):null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CustomAppBar;
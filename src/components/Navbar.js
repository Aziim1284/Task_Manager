// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const isAuth = localStorage.getItem("loginUser")
//   const logoutHandler =()=>{
//     localStorage.removeItem("loginUser")
//   }
//   return (
//     <Box sx={{ flexGrow: 1, marginBottom: 1 }}>
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             Task-Manager
//           </Typography>
//           {isAuth != null && isAuth != undefined ?
//           <>
//            <NavLink to="/dashboard" style={navLinkStyle}>
//             Dashboard
//           </NavLink> 
//           <a href="/login" style={navLinkStyle} onClick={logoutHandler}>
//             logout
//           </a> 
//           </>
//           :
//           <>
//             <NavLink to="/login" style={navLinkStyle}>
//             Login
//           </NavLink>
//           <NavLink to="/signup" style={navLinkStyle}>
//             Signup
//           </NavLink>
//           </>
//           }
          
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// const navLinkStyle = {
//   textDecoration: 'none',
//   color: 'white',
//   margin: '0 10px',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   '&:hover': {
//     color: 'lightgray',
//   },
// };

// export default Navbar;
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const isAuth = localStorage.getItem('loginUser');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem('loginUser');
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 1}}>
      <AppBar position="fixed" sx={{backgroundColor: 'green'}}>
        <Toolbar>
          {isMobile ?
           <IconButton
           size="large"
           edge="start"
           color="inherit"
           aria-label="menu"
           onClick={handleDrawerOpen}
           sx={{ mr: 2 }}
         >
           <MenuIcon />
         </IconButton>:null }
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task-Manager
          </Typography>
          {isAuth != null && isAuth != undefined ? (
            isMobile ? (
             null
            ) : (
              <>
                <NavLink to="/dashboard" style={navLinkStyle}>
                  Dashboard
                </NavLink>
                <a href="/login" style={navLinkStyle} onClick={logoutHandler}>
                  Logout
                </a>
              </>
            )
          ) : isMobile ? (
           null
          ) : (
            <>
              <NavLink to="/login" style={navLinkStyle}>
                Login
              </NavLink>
              <NavLink to="/signup" style={navLinkStyle}>
                Signup
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          {isAuth != null && isAuth != undefined ? (
            <>
              <ListItem button onClick={handleDrawerClose}>
                {isMobile ? (
                  <NavLink to="/dashboard" style={drawerLinkStyle}>
                    <ListItemText primary="Dashboard" />
                  </NavLink>
                ) : (
                  <NavLink to="/dashboard" style={drawerLinkStyle}>
                    <ListItemText primary="Dashboard" />
                  </NavLink>
                )}
              </ListItem>
              <ListItem button onClick={handleDrawerClose}>
                {isMobile ? (
                  <a href="/login" style={drawerLinkStyle} onClick={logoutHandler}>
                    <ListItemText primary="Logout" />
                  </a>
                ) : (
                  <a href="/login" style={drawerLinkStyle} onClick={logoutHandler}>
                    <ListItemText primary="Logout" />
                  </a>
                )}
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={handleDrawerClose}>
                {isMobile ? (
                  <NavLink to="/login" style={drawerLinkStyle}>
                    <ListItemText primary="Login" />
                  </NavLink>
                ) : (
                  <NavLink to="/login" style={drawerLinkStyle}>
                    <ListItemText primary="Login" />
                  </NavLink>
                )}
              </ListItem>
              <ListItem button onClick={handleDrawerClose}>
                {isMobile ? (
                  <NavLink to="/signup" style={drawerLinkStyle}>
                    <ListItemText primary="Signup" />
                  </NavLink>
                ) : (
                  <NavLink to="/signup" style={drawerLinkStyle}>
                    <ListItemText primary="Signup" />
                  </NavLink>
                )}
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

const navLinkStyle = {
  textDecoration: 'none',
  color: 'white',
  margin: '0 10px',
  fontSize: '16px',
  fontWeight: 'bold',
  '&:hover': {
    color: 'lightgray',
  },
};

const drawerLinkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontSize: '16px',
  fontWeight: 'bold',
};

export default Navbar;


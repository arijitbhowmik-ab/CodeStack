import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../public/logo.jpg'
import axios from 'axios';
import toast from 'react-hot-toast';


// import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BACKEND_URL } from '../utils/utils';

const drawerWidth = 240;
const navItems = ['Home', 'Login', 'Sign up'];

// const Navbar = (props) => {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         MUI
//       </Typography>
//       <Divider />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item} disablePadding>
//             <ListItemButton sx={{ textAlign: 'center' }}>
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//                     <div className='flex items-center space-x-2'>
//                        <img src={logo} alt="" className='rounded-full md:w-12 md:h-12 w-9 h-9'/>
//                        <h1 className='md:text-2xl text-xl font-bold text-yellow-500'>LearnWithArijit</h1>
//                    </div>
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item) => (
//               <Button key={item} sx={{ color: '#fff' }}>
//                 {item}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//       </Box>
//     </Box>
//   );
// }
const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('user')
    if(token)
    {
      setIsLoggedIn(true)
      
    }
    else
    {
      setIsLoggedIn(false)
    }

  },[])

  const handleLogout = async () => {
    try {
    const response = axios.get(`${BACKEND_URL}/user/logout`, {withCredentials: true})
    toast.success((await response).data.message)
    localStorage.removeItem('user')
    // localStorage.removeItem('admin')
    setIsLoggedIn(false)
    navigate('/')
    } catch (error) {
      console.log("Error in logout: ", error)
      toast.error( error.response.data.errors || "Failed to logout. Try again.")
    }
  }
    
  return (
    <>
      <header className='flex sticky top-0 z-50 bg-white items-center justify-between py-2 border-b border-white h-18 md:px-20 px-3'>
                  {/* <div className='container mx-auto flex items-center justify-between'> */}
                  <div className='flex items-center space-x-2'>
                      <img src={logo} alt="" className='rounded-full md:w-12 md:h-12 w-9 h-9'/>
                      <Link to={"/"} className='md:text-2xl text-xl font-bold text-yellow-500'>CodeStack</Link>
                  </div>
                  <div className='space-x-4 flex justify-center items-center'>
                  <Link to={"/"} className='text-green-500 hover:text-green-600 font-semibold hidden md:inline lg:inline sm:inline'>Home</Link>
                    {
                      isLoggedIn ?
                       (
                        <div>
                          <Link to={"/purchases"} className='text-green-500 hover:text-green-600 font-semibold hidden md:inline lg:inline sm:inline'>My Courses</Link>&nbsp;&nbsp; &nbsp;
                          <button onClick={handleLogout} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 duration-300 cursor-pointer'>Log out</button>
                        </div>
                       ) : 
                       (
                        <>
                        <Link to={"/login"} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 duration-300 hover:text-black'>Login</Link>
                        <Link to={"/signup"} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 duration-300 hover:text-black'>Sign up</Link>
                        </>
                       )
                    }
                    
                  </div>
                  {/* </div> */}
        </header>

        
    </>
  )
}

export default Navbar

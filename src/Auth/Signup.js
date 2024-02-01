import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupFailure, signupRequest, signupSuccess , registeredUsers} from '../redux/authslice';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2';
const Signup = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  // const user = useSelector((state) => state.auth.users);
  const user = useSelector((state) => {
    return Array.isArray(state.auth.users) ? state.auth.users : [];
  });
  // console.log("userssss" ,useSelector(registeredUsers))
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  const [Error ,setError]=useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  })
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: '' }));
     
    if (name === 'phone') {
      const phoneRegex = /^[^\De]{10,12}$/;;
      if (!phoneRegex.test(value)) {
        setError((prevError) => ({ ...prevError, [name]: 'You can Enter 10-12 digit number' }));
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError((prevError) => ({ ...prevError, [name]: 'Invalid email address : use format abc@gmail.com' }));
      }
    }
    
  };

  
  const handleSignup = async (e) => {
    e.preventDefault();
    // debugger
    dispatch(signupRequest());
    try {
      const user = { ...userData, id: Date.now() }; 
      dispatch(signupSuccess(user));
      localStorage.setItem('persistedUser', JSON.stringify(user));
      Swal.fire({
        icon: "success",
        text:"User register Success",
        timer: 2000,
      });
      navigate("/login")
    } catch (error) {
      console.log("errorrrr" ,error)
      dispatch(signupFailure('An unexpected error occurred. Please try again.'));
      Swal.fire({
        icon: "error",
        text:"An unexpected error occurred",
        timer: 2000,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 9 }}>
      <Paper elevation={3} sx={{ padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <PersonAddAltOutlinedIcon />
        </Avatar>
        <Typography component="h3" variant="h6">
          Register
        </Typography>

        {/* {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )} */}

        <form onSubmit={handleSignup} style={{ width: '100%', marginTop: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Your FullName"
                name="name"
                variant="outlined"
                onChange={handleInputChange}
                
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Your Email"
                name="email"
                type="email"
                variant="outlined"
                onChange={handleInputChange}
                required
              />
              {Error.email && (
                <Typography color="error" variant="caption">
                  {Error.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Your Phone"
                name="phone"
                type='number'
                variant="outlined"
                onChange={handleInputChange}
                required
              />
              {Error.phone && (
                <Typography color="error" variant="caption">
                  {Error.phone}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Your Username"
                name="username"
                variant="outlined"
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter YOur Password"
                name="password"
                type="password"
                variant="outlined"
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          {/* {Object.keys(Error).map((fieldName) => (
              <Grid item xs={12} key={fieldName}>
                <Typography color="error" variant="caption">
                  {Error[fieldName]}
                </Typography>
              </Grid>
            ))} */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;

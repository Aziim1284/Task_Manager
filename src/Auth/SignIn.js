import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinRequest } from "../redux/authslice";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleIcon from "@mui/icons-material/Google";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Signin = () => {
  const usususu = process.env.REACT_APP_API_KEY
  console.log("checkingdat" ,usususu)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    recaptcha: "",
  });
  const [Error ,setError]=useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: '' }));
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError((prevError) => ({ ...prevError, [name]: 'Invalid email address : use format abc@gmail.com' }));
      }
  };

  };
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    setRecaptchaError("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const Data = localStorage.getItem("persistedUser");
    const storedData = JSON.parse(Data);
    if (!recaptchaValue) {
      setRecaptchaError("Please complete the reCAPTCHA.");
      return;
    }
    const user = {
      email: loginData.email,
      password: loginData.password,
      recaotcha: loginData.recaptcha,
    };
    if (
      user.email == storedData.email &&
      user.password == storedData.password
    ) {
      dispatch(signinRequest(user));
      localStorage.setItem("loginUser", JSON.stringify(user));
      Swal.fire({
        icon: "success",
        text: "User LoggedIn Success",
        timer: 2000,
      })
      window.location.href = "/dashboard";
      // navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        text: "Invalid Email or Password",
        timer: 2000,
      })
    }
  };
  // const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_API_KEY,
  //   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  //   databaseURL:process.env.REACT_APP_DATABASE_URL,
  //   projectId: process.env.REACT_APP_PROJECTID,
  //   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  //   messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
  //   appId: process.env.REACT_APP_APPID,
  //   measurementId: process.env.REACT_APP_MEASUREMENTID,
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyDmDK1wyxIZJr6hgXZq1Wis-ythq3Ve1R8",
    authDomain: "craet1.firebaseapp.com",
    databaseURL: "https://craet1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "craet1",
    storageBucket: "craet1.appspot.com",
    messagingSenderId: "916839362500",
    appId: "1:916839362500:web:cc8437b6eac1cf345dfe91",
    measurementId: "G-7BQEWQMTW1"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const GoogleAuthentication = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("result", result);
      const user = {
        email: result.user.email,
        password: result.user.uid,
      };
      localStorage.setItem("loginUser", JSON.stringify(user));
      Swal.fire({
        icon: "success",
        text: "Google login Success",
        timer: 2000,
      })
      window.location.href = "/dashboard";
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 9 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <form
          onSubmit={handleLogin}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
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
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{
            mt:1
          }}>
            {recaptchaError && (
              <p style={{ color: "red", margin: "5px 0", fontSize: "0.8rem" }}>
                {recaptchaError}
              </p>
            )}
            <ReCAPTCHA
              size="normal"
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleRecaptchaChange}
              className="captchaResizing"
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </form>
        <Button onClick={GoogleAuthentication} fullWidth variant="contained">
          Signin With Google <GoogleIcon />
        </Button>
      </Paper>
    </Container>
  );
};

export default Signin;
// Login.js
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { signinRequest, signinSuccess, signinFailure} from '../redux/authslice';
// import { Button, TextField, Typography, Container, Paper, Grid, Avatar ,Box} from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { useNavigate } from 'react-router-dom';
// import Swal from "sweetalert2";
// import ReCAPTCHA from "react-google-recaptcha";
// import GoogleIcon from "@mui/icons-material/Google";
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// const SignIn = () => {
//   const dispatch = useDispatch();
//   const navigate =useNavigate()
//   const [recaptchaValue, setRecaptchaValue] = useState("");
//   const [recaptchaError, setRecaptchaError] = useState("");
//   const loading = useSelector((state) => state.auth?.loading);
//   const error = useSelector((state) => state.auth?.error);
  
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//   });
  // const [Error ,setError]=useState({
  //   email: '',
  //   password: '',
  // })
//   const handleRecaptchaChange = (value) => {
//     setRecaptchaValue(value);
//     setRecaptchaError("");
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prevData) => ({ ...prevData, [name]: value }));
//     setError((prevError) => ({ ...prevError, [name]: '' }));

  //   if (name === 'email') {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(value)) {
  //       setError((prevError) => ({ ...prevError, [name]: 'Invalid email address : use format abc@gmail.com' }));
  //     }
  //   }
  // };

//   const handleLogin = async (e) => {
   
//     dispatch(signinRequest());
  
//     try {
//       const storedUser = JSON.parse(localStorage.getItem('persistedUser'));
//       if (!recaptchaValue) {
//         setRecaptchaError("Please complete the reCAPTCHA.");
//         return;
//       }
//       if (storedUser && loginData.email === storedUser.email && loginData.password === storedUser.password) {
//         dispatch(signinSuccess(loginData));
//         localStorage.setItem("loginUser" ,JSON.stringify(loginData))
//         Swal.fire({
//           icon: "success",
//           text:"LoggedIn Success",
//           timer: 2000,
//         });
//         // navigate("/dashboard")
//         window.location.href("/dashboard")
//       } else {
//         dispatch(signinFailure('Invalid email or password'));
//         Swal.fire({
          // icon: "error",
          // text: "Invalid Email or Password",
          // timer: 2000,
//         });
//       }
  
//     } catch (error) {
//       dispatch(signinFailure('An unexpected error occurred. Please try again.'));
//       Swal.fire({
//         icon: "error",
//         text: "An unexpected error occurred.",
//         timer: 2000,
//       });
//     }
//   };
 
//   const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL:process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID,
//     appId: process.env.REACT_APP_APPID,
//     measurementId: process.env.REACT_APP_MEASUREMENTID,
//   };
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();

//   const GoogleAuthentication = () => {
//     signInWithPopup(auth, provider).then((result) => {
//       console.log("result", result);
//       const user = {
//         email: result.user.email,
//         password: result.user.uid,
//       };
//       localStorage.setItem("loginUser", JSON.stringify(user));
//       Swal.fire({
//         icon: "success",
//         text:" Google LoggedIn Success",
//         timer: 2000,
//       });
//       window.location.href = "/dashboard";
//     }); 
//   };

//   return (
//     <Container component="main" maxWidth="xs" sx={{ mt: 9 }}>
//       <Paper elevation={3} sx={{ padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Log In
//         </Typography>
//         <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '1rem' }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 required
//               />
              //  {Error.email && (
              //   <Typography color="error" variant="caption">
              //     {Error.email}
              //   </Typography>
              // )}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type="password"
//                 variant="outlined"
//                 onChange={handleInputChange}
//                 required
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{
//             width: "100px"
//           }}>
//             {recaptchaError && (
//               <p style={{ color: "red", margin: "5px 0", fontSize: "0.8rem" }}>
//                 {recaptchaError}
//               </p>
//             )}
//             <ReCAPTCHA
//             size="normal"
//               sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//               onChange={handleRecaptchaChange}
//               className="captchaResizing"
//             />
//           </Box>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//             disabled={loading}
//           >
//             Login
//           </Button>
//         </form>
//         <Button onClick={GoogleAuthentication} fullWidth variant="contained">
//           Signin With Google <GoogleIcon />
//         </Button>
//       </Paper>
//     </Container>
//   );
// };

// export default SignIn;


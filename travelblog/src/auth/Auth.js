import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { sendAuthRequest } from '../api-helpers/helper';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const [inputs, setInputs] = useState({name:"", email:"", password:""});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    const onResRecieved = (data) => {
      if(isSignup) {
        localStorage.setItem("userId", data.user._id);
      } else {
        localStorage.setItem("userId", data.id);
      }
      dispatch(authActions.login());
      navigate("/diaries");
    }

    if(isSignup) {
      sendAuthRequest(true, inputs)
      .then(onResRecieved)
      .catch(err => console.log(err));
    } else {
      sendAuthRequest(false, inputs)
      .then(onResRecieved)
      .catch(err => console.log(err));
    }

  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState, [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box
     width="40%"
     borderRadius={10}
     boxShadow={"5px 5px 10px #678983"}
     margin="auto"
     marginTop={5}
     sx={{backgroundColor:"white"}}
     >
      <form onSubmit={handleSubmit}>
        <Box
        display="flex"
        width="60%"
        flexDirection={"column"}
        padding={5}
        margin="auto"
        >
          <Typography fontFamily={'Montserrat, sans-serif'} sx={{color:"#181D31"}} padding={2} variant='h5' textAlign="center">{isSignup ? "SIGN UP" : "LOGIN" }</Typography>
          {isSignup && <><FormLabel sx={{color:"#181D31"}}>Name</FormLabel>
          <TextField onChange={handleChange} value={inputs.name} name="name" margin='normal' /> </>}
          <FormLabel sx={{color:"#181D31"}}>Email</FormLabel>
          <TextField onChange={handleChange} type="email" value={inputs.email} name="email" margin='normal' />
          <FormLabel sx={{color:"#181D31"}}>Password</FormLabel>
          <TextField onChange={handleChange} type="password" value={inputs.password} name="password" margin='normal' />
          <Button sx={{mt:2, borderRadius:10, color:"#E6DDC4", backgroundColor:"#181D31", ":hover":{backgroundColor:"#2D033B"}}} type='submit' variant='contained' color='primary'>{isSignup ? "SIGN UP" : "LOGIN" }</Button>
          <Button onClick={() => setIsSignup(!isSignup) } sx={{mt:2, borderRadius:10, color:"#181D31"}} variant='outlined' color='primary'>{isSignup ? "LOGIN" : "SIGN UP"}</Button>
        </Box>
      </form>
    </Box>
  )
}

export default Auth
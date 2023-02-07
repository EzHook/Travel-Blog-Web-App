import { Box, Button, Typography } from '@mui/material'
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box position={"relative"} width="100%" height="90vh">
        <img src="/travel.jpeg" alt='Trekking Image' width={"100%"} height={"80%"} />
        <Typography fontWeight="bold" fontFamily={"Dancing Script, cursive"} variant='h3' textAlign={"center"} width="100%" sx={{position:"absolute", top: "0px", color:"#181D31", textDecoration: "underline"}}>
            The journey of thousand miles starts with one step.
        </Typography>
        <Box width="100%" height="30%" display={"flex"} flexDirection="column" >
        <Typography fontFamily={"Quicksand,sans-serif"} textAlign={"center"} variant="h4" padding={5}>
          SHARE YOUR STORIES WITH US
        </Typography>
        <Box margin="auto">
          <Button size='large' LinkComponent={Link} to="/add" variant='contained' sx={{mr: 2,}} color="secondary" >Share Your Story</Button>
          <Button size='large' LinkComponent={Link} to="/diaries" variant='contained' sx={{ml: 2}}>View Diaries</Button>
        </Box>
        </Box>
    </Box>
  )
}

export default Home
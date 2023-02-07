import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ExploreIcon from '@mui/icons-material/Explore';
import { addPost } from '../api-helpers/helper';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({title:"", description:"", image:"", location:"", date:""});
    const handleChange = (e) => {
        setInputs((prevState)=>({...prevState,[e.target.name] : e.target.value, }));
    }
    const onResRecieved = (data) => {
        console.log(data);
        navigate("/diaries");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        addPost(inputs).then(onResRecieved).catch(err => console.log(err));
    }
  return (
   <Box display="flex" flexDirection={"column"} width="100%" height="100%">
    <Box display="flex" margin="auto" padding={2}>
        <Typography sx={{color: "#181D31"}} fontWeight={"bold"} variant="h4" fontFamily={"dancing script"}>Add Your Travel Experience</Typography>
        <ExploreIcon sx={{fontSize:"40px", paddingLeft:1, color:"#678983"}}/>
    </Box>
    <form onSubmit={handleSubmit}>
        <Box display="flex" width="65%" flexDirection={"column"} margin="auto" padding={2}>
            <FormLabel  sx={{color:"#181D31"}} fontFamily={'Montserrat, sans-serif'}>Title</FormLabel>
            <TextField onChange={handleChange} name="title" value={inputs.title} variant="standard" margin="normal"/>
            <FormLabel  sx={{color:"#181D31"}} fontFamily={'Montserrat, sans-serif'}>Description</FormLabel>
            <TextField onChange={handleChange} name="description" value={inputs.description} variant="standard" margin='normal'/>
            <FormLabel  sx={{color:"#181D31"}} fontFamily={'Montserrat, sans-serif'}>Image URL</FormLabel>
            <TextField onChange={handleChange} name="image" value={inputs.image} variant="standard" margin='normal'/>
            <FormLabel  sx={{color:"#181D31"}} fontFamily={'Montserrat, sans-serif'}>Location</FormLabel>
            <TextField onChange={handleChange} name="location" value={inputs.location} variant="standard" margin='normal'/>
            <FormLabel  sx={{color:"#181D31"}} fontFamily={'Montserrat, sans-serif'}>Date</FormLabel>
            <TextField type="date" onChange={handleChange} name="date" value={inputs.date} variant="standard" margin='normal'/>
            <Button type="submit" sx={{width: "50%", margin:"auto", mt:2, color:"#E6DDC4", backgroundColor:"#181D31", ":hover":{backgroundColor:"#2D033B"}, borderRadius:10}} variant="contained">POST</Button>
        </Box>
    </form>
   </Box>
  )
}

export default Add
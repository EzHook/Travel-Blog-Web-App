import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../api-helpers/helper'
import { Box, Button, Typography } from "@mui/material"
import DiaryItem from '../diaries/DiaryItem';
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(()=>{
    getUserDetails().then((data)=>{setUser(data.user)}).catch(err=>console.log(err));
  },[]);

  const handleClick = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/");
  }

  return (
    <Box display="flex" flexDirection={"column"}>
      { user && <> <Typography sx={{color:"#181D31"}} textAlign={"center"} variant="h3" fontFamily={"quicksand"} padding={2}>User Profile</Typography>
      <Typography textAlign={"left"} fontFamily={"quicksand"} padding={1}>Name: {user.name}</Typography>
      <Typography textAlign={"left"} fontFamily={"quicksand"} padding={1}>Email: {user.email}</Typography>
      <Button onClick={handleClick} sx={{mr:"auto", width:"15%"}} variant="contained" color="warning">LOGOUT</Button>
      <Box display="flex" flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        {user.posts.map((post, index)=>{<DiaryItem 
          key={index}
          title={post.title}
          date={post.date}
          description={post.description}
          location={post.location}
          id={post.id}
          image={post.image}
          user={user._id}
           />})}
      </Box> </>}
    </Box>
  )
}

export default Profile
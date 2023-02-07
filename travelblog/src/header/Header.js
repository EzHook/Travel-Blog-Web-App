import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import HikingIcon from '@mui/icons-material/Hiking';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const linkArray = ["home", "diaries", "auth"];
const loggedInLinks = ["home", "diaries", "add", "profile"];

const Header = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [value, setValue] = useState();

  return (
    <div>
        <AppBar sx={{bgcolor : "#181D31" }} position="sticky">
            <Toolbar>
                <HikingIcon sx={{color:"#E6DDC4"}} />
                <Tabs value={value} onChange={(e, val)=> setValue(val)} sx={{ml: "auto", textDecoration: "none"}}>
                    {isLoggedIn ? loggedInLinks.map(link => <Tab LinkComponent={Link} to={`/${link === "home" ? "" : link }`} sx={{textDecoration:"none", color:"#E6DDC4", ":hover":{textDecoration: "underline", textUnderlineOffset: "18px", color:"#E6DDC4"}}} key={link} label={link}/>) 
                    : linkArray.map(link => <Tab LinkComponent={Link} to={`/${link === "home" ? "" : link }`} sx={{textDecoration:"none", color:"#E6DDC4", ":hover":{textDecoration: "underline", textUnderlineOffset: "18px", color:"#E6DDC4"}}} key={link} label={link}/>)}
                </Tabs>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header
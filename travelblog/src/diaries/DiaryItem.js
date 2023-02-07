import React, { useState } from 'react';
import { Alert, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Snackbar, Typography,  } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { postDelete } from '../api-helpers/helper';

const DiaryItem = ({date, location, title, image, description, id, user}) => {
  const [open, setOpen] = useState(false);
  const isLoggedInUser = () => {
    if(localStorage.getItem("userId") === user) {
      return true
    }
    return false
  }
  const handleDelete = () => {
    postDelete(id).then(data=>console.log(data)).catch(err=>console.log(err));
    setOpen(true);
  }

  return (
    <Card sx={{ width:"50%", height:"auto", margin:1, padding:1, display:"flex", flexDirection:"column", boxShadow:"5px 5px 10px #ccc " }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#181D31" }} aria-label="recipe">

          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <LocationOnIcon />
          </IconButton>
        }
        title={location}
        header={location}
        subheader={date}
      />
      <img
        height="194"
        src={image}
        alt={title}
      />
      <CardContent>
        <Typography paddingBottom={1} variant="h5" color="text.secondary" fontFamily={'Montserrat, sans-serif'}>
          {title}
        </Typography>
        <hr/>
        <Box paddingTop={1} display="flex">
        <Typography variant='caption' fontWeight={"bold"} width="50px" padding={1}>
          <HistoryEduIcon/>
        </Typography>
          <Typography variant="body2" color="text.secondary" fontFamily={'Montserrat, sans-serif'}>
            {description}
          </Typography>
        </Box>
      </CardContent>
      {isLoggedInUser() && (<CardActions sx={{ml:"auto"}}>
        <IconButton LinkComponent={Link} to={`/post/${id}`} color='primary'><EditIcon/></IconButton>
        <IconButton onClick={handleDelete} color="warning"><DeleteIcon/></IconButton>
      </CardActions>)}
      <Snackbar open={open} autoHideDuration={6000} onClose={()=> {setOpen(false)}}>
      <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }}>
        Post Successfully Deleted
      </Alert>
    </Snackbar>
    </Card>
  )
  
}

export default DiaryItem
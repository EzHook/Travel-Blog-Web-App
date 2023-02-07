import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../api-helpers/helper'
import DiaryItem from './DiaryItem'

const Diaries = () => {
  const [post, setPost] = useState();
  useEffect(() => {
    getAllPosts().then(data=>setPost(data?.posts)).catch(error=>console.log(error));
  }, []);
  
  return (
    <Box display="flex" flexDirection={"column"} padding={3} justifyContent="center" alignItems={"center"} >
      {post && post.map((item, index) =><DiaryItem 
      date={new Date(`${item.date}`).toLocaleDateString()}
      description={item.description}
      title={item.title}
      location={item.location}
      image={item.image}
      id={item._id}
      key={index} 
      user={item.user}
      />)}
    </Box>

  )
}

export default Diaries
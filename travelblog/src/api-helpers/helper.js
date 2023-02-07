import axios from "axios";
export const getAllPosts = async() => {
   const res = await axios.get("/posts");

   if(res.status !== 200) {
    return console.log("Error occured");
   }
   const data = res.data;
   return data;
};

export const sendAuthRequest = async (signup, data) => {
   const res = await axios.post(`/user/${signup ? "signup" : "login"}/`, {
      name: data.name ? data.name : "" ,
      email: data.email,
      password: data.password,
   }).catch(err => console.log(err));

   if(res.status !== 200 && res.status !== 201) {
      return console.log("Unable to Authenticate");
   }
   const resData = await res.data;
   return resData;
};

export const addPost = async(data) => {
  const res = await axios.post("/posts/", {
      title: data.title,
      description: data.description,
      image: data.image,
      date: data.date,
      location: data.location,
      user: localStorage.getItem("userId"),
   }).catch(err => console.log(err));
   
   if(res.status !== 201){
      return console.log("error occured");
   }
   const resData = await res.data;
   return resData;
};

export const getPostDetails = async(id) => {
 const res = await axios.get(`/posts/${id}`).catch((err)=>{console.log(err)});

 if(res.status !== 200) {
   return console.log("Error Occured");
 }
const resData = await res.data;
return resData;
}

export const updatePost = async(data, id) => {
   const res = await axios.put(`/posts/${id}`, {
      title: data.title,
      description: data.description,
      image: data.image,
      location: data.location,
   }).catch(err => console.log(err));

   if(res.status !== 200) {
      return console.log("Error Occured");
   }

   const resData = await res.data;
   return resData;
}

export const postDelete = async(id) => {
 const res = await axios.delete(`/posts/${id}`).catch(err=>console.log(err));

 if(res.status !== 200) {
   return console.log("Unable to Delete");
 }
 const resData = await res.data;
 return resData;
}

export const getUserDetails = async() => {
   const id = localStorage.getItem("userId");
   const res = await axios.get(`/user/${id}`).catch(err => console.log(err));

   if(res.status !== 200) {
      return console.log("failed to get the User");
   }
   const resData = await res.data;
   return resData;
}
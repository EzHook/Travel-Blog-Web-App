const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const { default: postRouter } = require("./routing/post-routes");
const { default: useRouter } = require("./routing/user-routes");
require("dotenv").config();
const cors = require ("cors");
const mongoURL = process.env.MONGODB_CLIENT_ID;

//middleware

app.use(cors());
app.use(express.json());
app.use("/user", useRouter);
app.use("/posts", postRouter);

//connections
mongoose.connect(mongoURL)
.then(()=> {
    app.listen(5000, (req, res)=> {
        console.log("We are live on port");
    });
})
.catch((error)=> console.log(error));


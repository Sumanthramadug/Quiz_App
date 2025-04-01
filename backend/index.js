var express = require('express');
var app = express();
var dotenv = require('dotenv').config();
var mongoose = require('./Config/mongodb');
var collection = require('./Models/userSchema');
var cookieParser = require('cookie-parser')
var cors = require('cors');
const PORT = process.env.PORT;

const allowedOrigins = ['http://localhost:3000','http://127.0.0.1:3000']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}))


app.use('/api/auth',require('./Controllers/authController'))

app.get("/",(req,res)=>{
    res.send("Hello world");
})
app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);
}); 
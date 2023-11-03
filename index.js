const authRoutes = require('./routes/authRoutes');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require('cors');

app.use(cors());
require('dotenv').config();

app.use(express.json());


app.use('/auth',authRoutes);


mongoose.connect(process.env.DBURL);

const dbConnection = mongoose.connection;
dbConnection.on('error',(err)=>{
    console.log("error connecting to database");
})
dbConnection.on('open',()=>console.log('connected to databse'));

app.listen(process.env.PORT || 3000,()=>console.log("listening at port 3000"));






    
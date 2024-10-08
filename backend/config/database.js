const mongoose = require('mongoose');
require('dotenv').config();

//connect to database
exports.connect  = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
    
    }).then(()=>console.log('Connected to database'))
        .catch(err=>console.error('Error connecting to database:',err));
}
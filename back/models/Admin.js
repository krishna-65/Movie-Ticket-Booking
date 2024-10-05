const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    addedMovies:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie',
        required:true,
    },
    ]
});

module.exports = mongoose.model('Admin', adminSchema);
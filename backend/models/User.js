const { verify } = require('jsonwebtoken');
const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
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

    bookings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required:true,
        }
    ]
    

})

module.exports = mongoose.model('User',userSchema)
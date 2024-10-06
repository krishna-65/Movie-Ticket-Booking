const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    releaseDate:{
        type: Date,
        required: true
    },
    posterUrl:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
    },
    bookings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    }],
    actors:[{
        type: String,
        required: true
    }],
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },

})
module.exports = mongoose.model('Movie',movieSchema);
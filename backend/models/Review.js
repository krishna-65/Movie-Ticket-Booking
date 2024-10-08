const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating:{
        type:Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText:{
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Review', reviewSchema);
const mongoose = require('mongoose');
const  Review = require('../models/Review');
const User = require('../models/User');

exports.addReview = async(req,res)=>{
            try{
                const {userId, rating,reviewText}  = req.body;

                if(!userId ||!rating ||!reviewText){
                    return res.status(422).json({
                        success:false,
                        message:'Please provide all required fields'
                    })
                }
                const user = await User.findById(userId);
                if(!user){
                    return res.status(404).json({
                        success:false,
                        message:'User not exists'
                    })
                }
                const newReview = new Review({
                    userId,
                    rating,
                    reviewText
                });
               
                try{
                        const session = await mongoose.startSession();
                        session.startTransaction();
                        await newReview.save({session});
                        user.reviews.push(newReview);
                        await user.save({session});
                        session.commitTransaction();
                }catch(error){
                    return res.status(500).json({
                        success:false,
                        message:'Error in Adding Review'
                    })
                }

                return res.status(200).json({
                    success:true,
                    message:'Review added successfully'
                })

            }catch{
                        return res.status(500).json({
                            success:false,
                            message:'Server error while creating review'
                        })
            }
}

exports.getAllReviews = async(req,res)=>{
    try{
        const response = await Review.find();
        if(!response){
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Review successfully received',
            response
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Server error while getting reviews'
        })
    }
}
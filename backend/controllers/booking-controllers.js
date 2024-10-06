
const { default: mongoose } = require('mongoose');
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const User = require('../models/User');
const sendEmail = require('./sentEmail');

exports.newBooking = async(req,res) =>{
        try{
                
            const {movie,date,seatNumber,user} = req.body;

            if(!movie||!seatNumber||!user){
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields',
                })
            }
            const existingMovie = await Movie.findById(movie);
            if(!existingMovie){
                return res.status(404).json({
                    success: false,
                    message: 'Movie not found',
                })
            }

            const existingUser = await User.findById(user);
            if(!existingUser){
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                })
            }

           

            const seatIsNotAvailable = await Booking.findOne({movie,seatNumber});
            if(seatIsNotAvailable){
                return res.status(404).json({
                    success: false,
                    message: 'The selected seat is not available',
                    booking: seatIsNotAvailable
                })
            }
            let booking;
            try{
                 booking = new Booking({movie,date: new Date(`${date}`),seatNumber,user});
                 const session = await mongoose.startSession();
                  session.startTransaction();
                 existingUser.bookings.push(booking);
                 await existingUser.save({session});
                 existingMovie.bookings.push(booking);
                  await existingMovie.save({session});
                  booking = await booking.save({session});  
                 session.commitTransaction();

            }catch(error){
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred saving booking and deal with session',
                    error
                })
            }

            if(!booking){
                return res.status(500).json({
                    success: false,
                    message: 'Failed to book seat',
                })
            }

             sendEmail(existingUser.email, 'Booking Confirmation', `
                <h2>Thank you for booking your seats!</h2>
                <p>Here are your booking details:</p>
                <ul>
                    <li>Booking Details</li>
                    <li>Booking ID: ${booking.id}</li>
                    <li>Date & Time: ${date}</li>
                    <li>Seats: ${seatNumber}</li>
                </ul>
                <p>Enjoy your show!</p>
            `);


            return res.status(201).json({
                success: true,
                message: 'Booking successful',
                data: booking,
            })

        }catch(error){
            return res.status(500).json({
                success: false,
                message: `server error in booking seats`,
                error,
            })
        }
}

exports.getBookingById = async(req,res)=>{

    try{
            const booking = await  Booking.find({user:req.params.id})
            if(!booking){
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found',
                })
            }

            return res.status(200).json({
                success: true,
                data: booking,
            })

    }catch(error){
         return res.status(500).json({
            success: false,
            message: `server error in getting booking by id`,
            error,
        })
    }
}

exports.getAllBookings = async(req,res)=>{
    try{
    
            const bookings = await Booking.find();
          
            if(!bookings){
                return res.status(404).json({
                    success: false,
                    message: 'No bookings found',
                })
            }
            return res.status(200).json({
                success: true,
                data: bookings,
            })


    }catch(error){
        return res.status(500).json({
            success: false,
            message: `server error in getting all bookings`,
            error,
        })
    }
}

exports.cancelBooking = async(req,res)=>{
    try{

        const booking = await Booking.findOneAndDelete(req.params.id).populate("user movie");

        const session  = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.user.save({session});
        await booking.movie.save({session});
        session.commitTransaction();

        

    }catch(error){
        return res.status(500).json({
            success: false,
            message: `server error in cancelling booking`,
            error,
        })
    }
}


exports.getBookingByIdAndDatetime = async(req,res)=>{
    try{
        const date = req.body;
        const booking = await Booking.find({movie:req.params.id, date: date});

        if(!booking){
            return res.status(404).json({
                success: true,
                message: 'Booking not found',
            })
        }
        return res.status(200).json({
            success: true,
            data: booking,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: `server error in getting booking by id and datetime`,
            error,
        })
    }
}
const express = require('express');
const { newBooking, getBookingById, getAllBookings, getBookingByIdAndDatetime, cancelBooking } = require('../controllers/booking-controllers');

const bookingRouter = express.Router();

bookingRouter.post('/addbooking',newBooking);
bookingRouter.get('/:id',getBookingById);
bookingRouter.get('/',getAllBookings);
bookingRouter.delete('/delete/:id',cancelBooking);
//get booking by movie id and datetime
bookingRouter.get('/getbooking/:id',getBookingByIdAndDatetime);


//getBookingByUserId

module.exports = bookingRouter;

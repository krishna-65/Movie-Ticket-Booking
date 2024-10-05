const express = require('express');
const { newBooking, getBookingById, getAllBookings } = require('../controllers/booking-controllers');

const bookingRouter = express.Router();

bookingRouter.post('/',newBooking);
bookingRouter.get('/:id',getBookingById);
bookingRouter.get('/getallbookings',getAllBookings);


//getBookingByUserId

module.exports = bookingRouter;
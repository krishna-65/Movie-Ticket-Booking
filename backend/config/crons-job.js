const cron = require('node-cron');
const Booking = require('../models/Booking'); // Assuming you have a Booking model
const moment = require('moment');

// Cron job to run every hour
const cleanupExpiredBookings = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('Running task to delete expired bookings');

    try {
      // Get the current time
      const currentTime = moment().toISOString();

      // Delete bookings where datetime is in the past
      const result = await Booking.deleteMany({
        date: { $lt: currentTime }
      });

      console.log(`${result.deletedCount} expired bookings deleted.`);
    } catch (error) {
      console.error('Error deleting expired bookings:', error);
    }
  });
};


module.exports = cleanupExpiredBookings;

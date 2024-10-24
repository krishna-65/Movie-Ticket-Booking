const cron = require('node-cron');
const Booking = require('../models/Booking'); // Assuming you have a Booking model
const User = require('../models/User');
const moment = require('moment');

// Cron job to run every hour
const cleanupExpiredBookings = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('Running task to delete expired bookings');

    try {
      // Get the current time
      const currentTime = moment().toISOString();

      // Find all expired bookings
      const expiredBookings = await Booking.find({
        date: { $lt: currentTime }
      });

      if (expiredBookings.length > 0) {
        // Get all booking IDs
        const expiredBookingIds = expiredBookings.map(booking => booking._id);

        // Delete the expired bookings
        const result = await Booking.deleteMany({
          _id: { $in: expiredBookingIds }
        });

        console.log(`${result.deletedCount} expired bookings deleted.`);

        // Remove the references from the User model
        await User.updateMany(
          { bookings: { $in: expiredBookingIds } }, // Find users with these expired bookings
          { $pull: { bookings: { $in: expiredBookingIds } } } // Remove the expired bookings
        );

        console.log('References to expired bookings removed from users.');
      } else {
        console.log('No expired bookings found.');
      }
    } catch (error) {
      console.error('Error deleting expired bookings and updating users:', error);
    }
  });
};

module.exports = cleanupExpiredBookings;

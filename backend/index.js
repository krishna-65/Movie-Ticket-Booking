const express = require('express');
const cors = require('cors');
const app = express();
const cleanupExpiredBookings = require('./config/crons-job');
app.use(express.json());
app.use(cors());
require('dotenv').config();

const PORT =  3001;


require('./config/database').connect();

cleanupExpiredBookings();

const movieRouter = require('./routes/movies-routes');
const userRouter = require('./routes/user-routes');
const adminRouter = require('./routes/admin-routes');
const bookingRouter = require('./routes/booking-routes');
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/movie', movieRouter);
app.use('/booking',bookingRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
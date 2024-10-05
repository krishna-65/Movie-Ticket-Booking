const express = require('express');
const { getAllUsers, addUser, updateUser, deleteUser, login, getAllBooking_for_User } = require('../controllers/user-controller');

const userRouter = express.Router();


userRouter.get('/', getAllUsers);
userRouter.post('/signup',addUser);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser);
userRouter.post('/login',login);



module.exports = userRouter;
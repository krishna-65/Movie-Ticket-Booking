const express = require('express');
const { addAdmin, adminLogin, getAllAdmin } = require('../controllers/admin-controllers');

const adminRouter = express.Router();

adminRouter.post('/signup',addAdmin);
adminRouter.post('/login',adminLogin);
adminRouter.get('/',getAllAdmin);

module.exports = adminRouter;
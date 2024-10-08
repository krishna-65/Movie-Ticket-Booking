const express = require('express');
const { addMovie, getAllMovies, getMovieById, getMovieByAdminId } = require('../controllers/movie-controllers');
const { addReview, getAllReviews } = require('../controllers/review-controller');

const reviewRouter = express.Router();

reviewRouter.post('/',addReview);
reviewRouter.get('/getallreview',getAllReviews);

module.exports = reviewRouter;

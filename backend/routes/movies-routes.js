const express = require('express');
const { addMovie, getAllMovies, getMovieById, getMovieByAdminId } = require('../controllers/movie-controllers');

const movieRouter = express.Router();

movieRouter.post('/',addMovie)
movieRouter.get('/getallmovies',getAllMovies);
movieRouter.get('/:id',getMovieById);
movieRouter.get('/admin/:id',getMovieByAdminId);;

module.exports = movieRouter;
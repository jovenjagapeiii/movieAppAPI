const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Public or standard authorized user routes
router.get('/getMovies', movieController.getAllMovies);
router.post('/getMovie', movieController.getMovieById); 
router.post('/addComment', verifyToken, movieController.addMovieComment);
router.get('/getComments', movieController.getMovieComments);

// Admin explicit restrictions
router.post('/addMovie', verifyAdmin, movieController.addMovie);
router.put('/updateMovie', verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie', verifyAdmin, movieController.deleteMovie);

module.exports = router;
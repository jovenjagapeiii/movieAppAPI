const Movie = require('../models/Movie');

exports.addMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.body.id || req.query.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.body.id);
        if (!deletedMovie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addMovieComment = async (req, res) => {
    try {
        const { movieId, text } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        movie.comments.push({ userId: req.user.id, text });
        await movie.save();
        res.status(201).json({ message: 'Comment added', movie });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMovieComments = async (req, res) => {
    try {
        const movie = await Movie.findById(req.body.movieId || req.query.movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.status(200).json(movie.comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
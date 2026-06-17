const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    comments: [CommentSchema] // Subdocument Array
});

module.exports = mongoose.model('Movie', MovieSchema);
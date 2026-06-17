const express = require('express');
const cors = require('cors'); // 1. Import CORS
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// 2. Enable CORS Middleware
// This allows your frontend application to communicate with your backend smoothly.
app.use(cors({
    origin: '*', // For development exams, allowing all origins is fine. For production, specify your exact frontend URL.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes configuration
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/movieRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
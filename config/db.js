const mongoose = require('mongoose');

const connectDB = async () => {
    // 1. Enable Mongoose debugging to see raw database queries in the terminal
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    // 2. Set up event listeners BEFORE calling connect() to capture instant lifecycle drops
    mongoose.connection.on('connecting', () => {
        console.log('🔄 Attempting connection to MongoDB Atlas...');
    });

    mongoose.connection.on('error', (err) => {
        console.error('❌ Mongoose connection driver error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ Mongoose lost connection to the database.');
    });

    try {
        // 3. Robust connection options to survive flaky network drops
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,         // Close sockets after 45s
            autoIndex: true,                // Ensure indexes (like unique email) build automatically
            maxPoolSize: 10                 // Keep up to 10 parallel sockets open to stabilize connections
        });
        
        console.log('✅ MongoDB Connected - Database connection established successfully.');
        console.log(`📡 Connected Host: ${mongoose.connection.host}`);
        console.log(`📁 Database Name: ${mongoose.connection.name}`);
    } catch (err) {
        console.error('🚨 Critical Connection Failure Stack Trace:');
        console.error(err.stack || err); // Prints full stack trace including filename/line numbers
        process.exit(1);
    }
};

module.exports = connectDB;
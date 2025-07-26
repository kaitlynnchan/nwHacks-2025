const mongoose = require('mongoose');
const { mongoURI } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kek:3HscWjrgwTrEXHCR@nwhacks2025.vla9g.mongodb.net');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;

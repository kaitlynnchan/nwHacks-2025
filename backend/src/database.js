const mongoose = require('mongoose');
const { mongoURI, mongoDbName } = require('../config/config');

const connectDB = async (uri = mongoURI) => {
    try {
        await mongoose.connect(uri, { dbName: mongoDbName });
        console.log(`MongoDB connected to '${mongoDbName}' database`);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;

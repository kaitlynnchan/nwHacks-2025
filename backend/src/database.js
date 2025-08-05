const mongoose = require('mongoose');
const { MONGO_URI, MONGO_DB_NAME } = require('../config/config');

const connectDB = async (uri = MONGO_URI) => {
    try {
        await mongoose.connect(uri, { dbName: MONGO_DB_NAME });
        console.log(`MongoDB connected to '${MONGO_DB_NAME}' database`);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit on failure
    }
};

module.exports = connectDB;

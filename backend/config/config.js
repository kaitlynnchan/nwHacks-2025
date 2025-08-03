require('dotenv').config();

const mongoURI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_APP_NAME}`;
const PORT = process.env.PORT || 3000;

const mongoDbName = (process.env.DEV_MODE) ? 'dev' : 'prod';

module.exports = {
    mongoURI,
    PORT,
    mongoDbName
};
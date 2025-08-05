require('dotenv').config();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_APP_NAME}`;
const MONGO_DB_NAME = (process.env.DEV_MODE) ? 'dev' : 'prod';

const PORT = process.env.PORT || 3000;

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    MONGO_URI,
    MONGO_DB_NAME,
    PORT,
    SUPABASE_JWT_SECRET,
    NODE_ENV
};
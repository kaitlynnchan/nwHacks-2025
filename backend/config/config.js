require('dotenv').config();

const mongoURI = `mongodb+srv://kaitlynn:${process.env.MONGO_DB_PASSWORD}@connect-quest-1.wg4lupg.mongodb.net/?retryWrites=true&w=majority&appName=connect-quest-1`;
const PORT = process.env.PORT || 3000;

module.exports = {
    mongoURI,
    PORT
};
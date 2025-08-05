const jwt = require('jsonwebtoken');
const { SUPABASE_JWT_SECRET } = require('../../config/config');

const verifySupabaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
        req.user = { id: decoded.sub };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
}

module.exports = {
    verifySupabaseToken
};
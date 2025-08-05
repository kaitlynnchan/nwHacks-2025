const jwt = require('jsonwebtoken');
const { SUPABASE_JWT_SECRET } = require('../config/config');

const generateSupabaseToken = ({userId, email}) => {
  return jwt.sign(
    {
      sub: userId,
      email: email,
    },
    SUPABASE_JWT_SECRET,
    { algorithm: 'HS256' }
  );
};

module.exports = { generateSupabaseToken };
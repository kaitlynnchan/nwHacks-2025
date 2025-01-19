const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: { type: Number, required: true }, 
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    friends: { type: [Number], default: [] },
    challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserChallenge' }  ]
});

module.exports = mongoose.model('User', userSchema);

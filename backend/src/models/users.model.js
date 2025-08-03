const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.Schema({
    challengeId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    completed: { type: Boolean, default: false },
    notes: { type: String, default: ''},
    document: { type: String, default: null },
    completedAtTs: { type: Date, default: null },
});
const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    points: { type: Number, default: 0 },
    challenges: [ userChallengeSchema ],
    createdAtTs: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

module.exports = {
    User, UserChallenge
};
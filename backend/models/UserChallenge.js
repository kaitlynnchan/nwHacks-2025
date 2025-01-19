const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.Schema({
    challengeId: { type: Number, required: true }, 
    completed: { type: Boolean, default: 0 },
    answer: { type: String, default: ''},
    doc: { type: String },
    completedTime: { type: Date, default: 0 },
});

module.exports = mongoose.model('UserChallenge', userChallengeSchema);
const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.Schema({
    challengeId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    completed: { type: Boolean, default: false },
    answer: { type: String, default: ''},
    doc: { type: String, default: null },
    completedTime: { type: Date, default: null },
});

module.exports = mongoose.model('UserChallenge', userChallengeSchema);
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    pointsReward: { type: Number, required: true},
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    endDate: { type: Date },
});

module.exports = mongoose.model('Challenge', challengeSchema);
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true, default: 0 },
    description: { type: String, required: true, default: 0 },
    pointsReward: { type: Number, required: true, default: 0.0},
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    endDate: { type: Date },
});

module.exports = mongoose.model('Challenge', challengeSchema);
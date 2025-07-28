const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true},
    difficulty: { type: String },
    category: { type: String },
    estimatedTime: { type: Number },
    requirements: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {
    Challenge
};
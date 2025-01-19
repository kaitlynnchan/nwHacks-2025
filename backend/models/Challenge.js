const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    id: { type: Number, required: true }, 
    task: { type: String, required: true, default: 0 },
    points: { type: Number, required: true, default: 0.0},
    active: { type: Boolean, required: true, default: true },
    dateCreated: { type: Date },
});

module.exports = mongoose.model('Challenge', challengeSchema);
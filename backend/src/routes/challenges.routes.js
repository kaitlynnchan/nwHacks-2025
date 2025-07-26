const express = require('express');
const User = require('../models/User');
const UserChallenge = require('../models/UserChallenge');
const Challenge = require('../models/Challenge');
const router = express.Router();


// Endpoint to get specific (today's) challenge
router.get('/challenges/today', async (req, res) => {
    try {
        const challenge = await Challenge.findOne().sort({ createdAt: -1 });
        if (!challenge) 
            return res.status(404).json({ error: 'Challenge not found' });

        const response = {
            title: challenge.title,
            description: challenge.description,
            pointsReward: challenge.pointsReward,
            isActive: challenge.isActive,
            createdAt: challenge.createdAt,
            endDate: challenge.endDate,
            challengeId: challenge._id
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get all challenges
router.get('/challenges/:challengeId', async (req, res) => {
    try {
        const challenges = await Challenge.find({}, { title: 1, description: 1, pointsReward: 1,
                                                        isActive: 1, createdAt: 1, endDate: 1, _id: 1 });
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const express = require('express');
const User = require('../models/User');
const UserChallenge = require('../models/UserChallenge');
const Challenge = require('../models/Challenge');
const router = express.Router();

// Endpoint to create a user
router.post('/user/create', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint to get a user
router.get('/user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) 
            return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to add a friend
router.post('/user/addFriend', async (req, res) => {
    try{
        const { userUsername, friendUsername } = req.body;
        const user = await User.findOne(u => u.username === userUsername);
        const friend = await User.findOne(u => u.username === friendUsername);

        if (!user || !friend) {
            return res.status(404).json('User or friend not found');
        }

        if (user.friends.includes(friendUsername)) {
            return res.status(400).json({ error: 'Friend already added' });
        }

        user.friends.push(friendUsername);
        await user.save();

        res.status(200).json(user);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to update challenge
router.put('/user/updateChallenge', async (req, res) => {
    try {
        const { username, challenge } = req.body;
        const { challengeId, completed, answer, doc, completedTime } = challenge;
        
        const user = await User.findOne({ username: username });
        if (!user) 
            return res.status(404).json({ error: 'User not found' });

        const userChallenge = user.challenges.find((uc) => uc.challengeId === challengeId);
        if (!userChallenge)
            return res.status(404).json({ error: 'Challenge not found for this user' });

        // update info for userchallenge
        userChallenge.completed = completed;
        userChallenge.answer = answer;
        userChallenge.doc = doc;
        userChallenge.completedTime = completedTime;

        const dbChallenge = await Challenge.findOne({ _id: challengeId })
        if (!dbChallenge)
            return res.status(404).json({ error: 'Challenge not found' });
        
        // update user points
        user.points += dbChallenge.pointsReward;

        await user.save()

        const response = {
            username: user.username,
            points: user.points,
            challenge: {
                title: dbChallenge.title,
                description: dbChallenge.description,
                pointsReward: dbChallenge.pointsReward,
                isActive: dbChallenge.isActive,
                endDate: dbChallenge.endDate,
                challengeId: dbChallenge._id,
                completed: userChallenge.completed,
                answer: userChallenge.answer,
                doc: userChallenge.doc,
                completedTime: userChallenge.completedTime,
            },
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get specific challenge for user
router.get('/user/:username/challenge/:challengeId', async (req, res) => {
    try {
        const { username, challengeId } = req.params;
        const user = await User.findOne({ username: username });
        if (!user) 
            return res.status(404).json({ error: 'User not found' });

        const challenge = user.challenges.find((uc) => uc.challengeId === challengeId);
        res.status(200).json(challenge);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get specific (today's) challenge
router.get('/challenge/:challengeId', async (req, res) => {
    try {
        const challenge = await Challenge.findOne({ _id: req.params.challengeId });
        if (!challenge) 
            return res.status(404).json({ error: 'Challenge not found' });

        const response = {
            title: challenge.title,
            description: challenge.description,
            pointsReward: challenge.pointsReward,
            isActive: challenge.isActive,
            endDate: challenge.endDate,
            challengeId: challenge._id
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to get all challenges
router.get('/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
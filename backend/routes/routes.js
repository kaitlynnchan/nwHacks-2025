const express = require('express');
const User = require('../models/User');
// const UserChallenge = require('../models/userchallenge');
// const Challenge = require('../models/challenge');
const router = express.Router();

// Endpoint to create a user
router.post('/user/create', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.get('/user/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to add a friend
router.post('/user/addFriend', async (req, res) => {
    const { userId, friendId } = req.body;
    const user = User.findOne(u => u.id === userId);
    const friend = User.findOne(u => u.id === friendId);

    if (!user || !friend) {
        return res.status(404).send('User or friend not found');
    }

    if (user.friends.includes(friendId)) {
        return res.status(400).json({ error: 'Friend already added' });
    }

    user.friends.push(friendId);
    await user.save();

    res.status(200).send(user);
});

module.exports = router;
// Endpoint to create a user challenge
// app.post('/createChallenge', (req, res) => {
//     const { creatorId, challengeeId, description } = req.body;
//     const creator = users.find(u => u.id === creatorId);
//     const challengee = users.find(u => u.id === challengeeId);
//     if (!creator || !challengee) {
//         return res.status(404).send('Creator or challengee not found');
//     }
//     const challenge = { id: challenges.length + 1, creatorId, challengeeId, description, status: 'pending' };
//     challenges.push(challenge);
//     res.status(201).send(challenge);
// });

// Endpoint to update challenge
// app.put('/updateChallenge', (req, res) => {
//     const { challengeId, newChallengeeId } = req.body;
//     const challenge = challenges.find(c => c.id === challengeId);
//     const newChallengee = users.find(u => u.id === newChallengeeId);
//     if (!challenge || !newChallengee) {
//         return res.status(404).send('Challenge or new challengee not found');
//     }
//     challenge.challengeeId = newChallengeeId;
//     res.status(200).send(challenge);
// });
const express = require('express');
// const UserChallenge = require('../models/UserChallenge');
// const Challenge = require('../models/Challenge');
const router = express.Router();
const { createUser, getUser } = require('../controllers/users.controller')

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Endpoint to create a user
router.post('/users', createUser);

// Endpoint to get a user
router.get('/users/:userId', getUser);

// // Endpoint to add a friend
// router.post('/users/:username/friend/:friendUsername', async (req, res) => {
//     try{
//         const { userUsername, friendUsername } = req.params;
//         const user = await User.findOne( { username: userUsername } );
//         const friend = await User.findOne({username: friendUsername});

//         if (!user || !friend) {
//             return res.status(404).json('User or friend not found');
//         }

//         if (user.friends.includes(friendUsername)) {
//             return res.status(400).json({ error: 'Friend already added' });
//         }

//         user.friends.push(friendUsername);
//         await user.save();

//         res.status(200).json(user);
//     } catch (err){
//         res.status(500).json({ error: err.message });
//     }
// });

// Endpoint to update challenge
// router.post('/users/:userId/challenge/:challengeId', );

// router.put('/users/:userId/challenge/:challengeId', );

// // Endpoint to get specific challenge for user
// router.get('/users/:username/challenge/:challengeId', async (req, res) => {
//     try {
//         const { username, challengeId } = req.params;
//         const user = await User.findOne({ username: username });
//         if (!user) 
//             return res.status(404).json({ error: 'User not found' });

//         const userChallengeId = user.challenges.find((uc) => uc.challengeId === challengeId);
//         const challenge = UserChallenge.findOne({_id: userChallengeId})
//         res.status(200).json(challenge);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
const express = require('express');
const { 
    createUser, 
    getUser, 
    linkChallengeToUser, 
    getUserChallenge, 
    getUserChallenges
} = require('../controllers/users.controller')
const { verifySupabaseToken } = require('../middleware/supabase')

const router = express.Router();

router.post('/users', createUser);

router.get('/users/:userId', verifySupabaseToken, getUser);

router.post('/users/:userId/challenge/:challengeId', verifySupabaseToken, linkChallengeToUser);

router.get('/users/:userId/challenges', verifySupabaseToken, getUserChallenges);

router.get('/users/:userId/challenge/:challengeId', verifySupabaseToken, getUserChallenge);

// update user challenge
// router.put('/users/:userId/challenge/:challengeId', );

module.exports = {
    router
};


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
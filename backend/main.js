const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [];
let challenges = [];

// Endpoint to create a user
app.post('/createUser', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send('Username is required');
    }
    const user = { id: users.length + 1, username, friends: [] };
    users.push(user);
    res.status(201).send(user);
});

// Endpoint to add a friend
app.post('/addFriend', (req, res) => {
    const { userId, friendId } = req.body;
    const user = users.find(u => u.id === userId);
    const friend = users.find(u => u.id === friendId);
    if (!user || !friend) {
        return res.status(404).send('User or friend not found');
    }
    user.friends.push(friendId);
    res.status(200).send(user);
});

// Endpoint to create a user challenge
app.post('/createChallenge', (req, res) => {
    const { creatorId, challengeeId, description } = req.body;
    const creator = users.find(u => u.id === creatorId);
    const challengee = users.find(u => u.id === challengeeId);
    if (!creator || !challengee) {
        return res.status(404).send('Creator or challengee not found');
    }
    const challenge = { id: challenges.length + 1, creatorId, challengeeId, description, status: 'pending' };
    challenges.push(challenge);
    res.status(201).send(challenge);
});

// Endpoint to update challengee
app.put('/updateChallengee', (req, res) => {
    const { challengeId, newChallengeeId } = req.body;
    const challenge = challenges.find(c => c.id === challengeId);
    const newChallengee = users.find(u => u.id === newChallengeeId);
    if (!challenge || !newChallengee) {
        return res.status(404).send('Challenge or new challengee not found');
    }
    challenge.challengeeId = newChallengeeId;
    res.status(200).send(challenge);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

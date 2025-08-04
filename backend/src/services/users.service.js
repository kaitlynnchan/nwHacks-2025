const { default: mongoose } = require('mongoose');
const { User, UserChallenge } = require('../models/users.model');

const createUserDb = async ({ userId, email }) => {
    const newUser = new User({
        _id: userId,
        email: email
    });
    await newUser.save();
    return newUser;
}

const getUserDb = async ({ userId }) => {
    return await User.findById(userId);
}

const createUserChallenge = async ({ user, userChallenge, points }) => {
    const newUserChallenge = new UserChallenge({
        challengeId: userChallenge.challengeId,
        completed: userChallenge.completed,
        notes: userChallenge.notes,
        document: userChallenge.document,
        completedAtTs: userChallenge.completedAtTs
    });
    user.challenges.push(newUserChallenge);
    user.points = user.points + points;
    await user.save();
    return {
        userChallenge: newUserChallenge, 
        userPoints: user.points 
    };
};

const getUserChallengeDb = async ({ userId, challengeId }) => {
    const result = await User.findOne(
        { _id: userId, 'challenges.challengeId': challengeId },
        { 'challenges.$': 1 } // only matching 1 element
    );
    return result.challenges[0];
}

module.exports = {
    createUserDb, getUserDb, createUserChallenge, getUserChallengeDb
};
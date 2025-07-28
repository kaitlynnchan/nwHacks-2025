const { Challenge } = require('../models/challenges.model')

const createChallengeDb = async (challenge) => {
    const newChallenge = new Challenge(challenge);
    await newChallenge.save();
    
    console.log("New challenge created:", newChallenge._id);
    return newChallenge;
};

const getChallengeDb = async (challengeId) => {
    // If specific challenge is not provided, get the latest challenge
    if (!challengeId) {
        return await Challenge.findOne().sort({ createdAt: -1 });
    }
    return await Challenge.findById(challengeId);
}

const getAllChallengesDb = async () => {
    return await Challenge.find({});
}

module.exports = {
    createChallengeDb, getChallengeDb, getAllChallengesDb
}
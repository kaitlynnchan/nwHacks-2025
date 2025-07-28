const express = require('express');

const {
    createChallenge,
    getLatestChallenge,
    getChallengeById,
    getAllChallenges
} = require('../controllers/challenges.controller');


const router = express.Router();

router.post('/challenges', createChallenge);

router.get('/challenges', getAllChallenges);

router.get('/challenges/latest', getLatestChallenge);

router.get('/challenges/:challengeId', getChallengeById);

module.exports = {
    router
};
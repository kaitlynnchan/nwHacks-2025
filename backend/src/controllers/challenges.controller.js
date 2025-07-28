const { 
    createChallengeDb, 
    getChallengeDb, 
    getAllChallengesDb 
} = require("../services/challenges.service");

const createChallenge = async (req, res) => {
    try {
        const { title, description, points, difficulty, category, 
            estimatedTime, requirements } = req.body;
        const newChallenge = await createChallengeDb({
            title: title,
            description: description,
            points: points,
            difficulty: difficulty,
            category: category,
            estimatedTime: estimatedTime,
            requirements: requirements
        })
        return res.status(201).json(newChallenge)
    } catch (err) {
        return res.status(400).json({error: err.message})
    }

};

const getLatestChallenge = async (req, res) => {
    try {
        const challenge = await getChallengeDb();
        if (!challenge) {
            return res.status(404).json({ error: 'No challenge found' });
        }

        return res.status(200).json({
            id: challenge._id,
            title: challenge.title,
            description: challenge.description,
            points: challenge.points,
            difficulty: challenge.difficulty,
            category: challenge.category,
            estimatedTime: challenge.estimatedTime,
            requirements: challenge.requirements,
            isActive: challenge.isActive,
            createdAt: challenge.createdAt,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getChallengeById = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const challenge = await getChallengeDb(challengeId);
        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        return res.status(200).json({
            id: challenge._id,
            title: challenge.title,
            description: challenge.description,
            points: challenge.points,
            difficulty: challenge.difficulty,
            category: challenge.category,
            estimatedTime: challenge.estimatedTime,
            requirements: challenge.requirements,
            isActive: challenge.isActive,
            createdAt: challenge.createdAt,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllChallenges = async (req, res) => {
    try {
        const challenges = await getAllChallengesDb();
        if (!challenges) {
            return res.status(404).json({ error: 'No challenges found' });
        }

        return res.status(200).json(challenges);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createChallenge, getLatestChallenge, getChallengeById, getAllChallenges
}
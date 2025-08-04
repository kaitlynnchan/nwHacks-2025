const { getChallengeDb } = require('../services/challenges.service');
const { 
    createUserDb, 
    getUserDb,
    createUserChallenge, 
    getUserChallengeDb 
} = require('../services/users.service');

const createUser = async (req, res) => {
    try {
        const { userId, email } = req.body;
        const newUser = await createUserDb({ userId: userId, email: email});
        return res.status(201).json({
            id: newUser._id,
            email: newUser.email,
            points: newUser.points,
            challenges: newUser.challenges.map(uc => ({
                id: uc._id,
                challengeId: uc.challengeId,
                completed: uc.completed,
                notes: uc.notes,
                document: uc.document,
                completedAtTs: uc.completedAtTs
            }))
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserDb({ userId: userId });
        if (!user) 
            return res.status(404).json({ error: 'User not found' });
        return res.status(200).json({
            id: user._id,
            email: user.email,
            points: user.points,
            challenges: user.challenges.map(uc => ({
                id: uc._id,
                challengeId: uc.challengeId,
                completed: uc.completed,
                notes: uc.notes,
                document: uc.document,
                completedAtTs: uc.completedAtTs
            }))
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const linkChallengeToUser = async (req, res) => {
    try {
        const { userId, challengeId } = req.params;
        const { completed, notes, document, completedAtTs } = req.body;

        const user = await getUserDb({ userId: userId });
        const challenge = await getChallengeDb(challengeId);
        if (!user || !challenge) {
            return res.status(404).json({ error: "User or Challenge not found" });
        }

        if (user.challenges.find((c) => c.challengeId.equals(challengeId))) {
            return res.status(400).json({ error: "Challenge already linked to user" });
        }

        // create new user challenge and update points
        const { userChallenge, userPoints } = await createUserChallenge({
            user: user,
            userChallenge: {
                challengeId: challengeId,
                completed: completed,
                notes: notes,
                document: document,
                completedAtTs: completedAtTs
            },
            points: challenge.points
        });
        return res.status(201).json({ 
            userChallenge: {
                id: userChallenge._id,
                challengeId: userChallenge.challengeId,
                completed: userChallenge.completed,
                notes: userChallenge.notes,
                document: userChallenge.document,
                completedAtTs: userChallenge.completedAtTs
            }, 
            userPoints: userPoints 
        })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getUserChallenge = async (req, res) => {
    try {
        const { userId, challengeId } = req.params;
        const userChallenge = await getUserChallengeDb({ 
            userId: userId, 
            challengeId: challengeId
        });
        if (!userChallenge) {
            return res.status(404).json({ error: "User Challenge relationship not found" });
        }
        return res.status(200).json({
            id: userChallenge._id,
            challengeId: userChallenge.challengeId,
            completed: userChallenge.completed,
            notes: userChallenge.notes,
            document: userChallenge.document,
            completedAtTs: userChallenge.completedAtTs
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getUserChallenges = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserDb({ userId: userId });
        return res.status(200).json(user.challenges.map(uc => ({
            id: uc._id,
            challengeId: uc.challengeId,
            completed: uc.completed,
            notes: uc.notes,
            document: uc.document,
            completedAtTs: uc.completedAtTs
        })));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createUser, 
    getUser, 
    linkChallengeToUser, 
    getUserChallenge, 
    getUserChallenges
};
const { createUserDb, getUserDb } = require('../services/users.service');

const createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const newUser = await createUserDb(email);
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserDb(userId);
        if (!user) 
            return res.status(404).json({ error: 'User not found' });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// const updateUserChallenge = async (req, res) => {
//     try {
//         const { userId, challenge } = req.body;
//         const { challengeId, completed, notes, document, completedAtTs } = challenge;
        
//         const user = await getUserDb(userId);
//         if (!user) 
//             return res.status(404).json({ error: 'User not found' });

//         const dbchallenge = await getChallenge();

//         // find user challenge in user.challenges
//         const userChallenge = user.challenges.find((uc) => uc.challengeId === challengeId);

//         // if cant find, create new user challenge
//         if (!userChallenge){
//             // create user challenge

//         } else {
//             // update current
//         }


//         // const userChallengeId = user.challenges.find((uc) => uc.challengeId === challengeId);
//         // const userChallenge = UserChallenge.findOne({_id: userChallengeId})
//         // if (!userChallenge)
//         //     return res.status(404).json({ error: 'Challenge not found for this user' });

//         // // update info for userchallenge
//         // userChallenge.completed = completed;
//         // userChallenge.answer = answer;
//         // userChallenge.doc = doc;
//         // userChallenge.completedTime = completedTime;

//         // await userChallenge.save();

//         // const dbChallenge = await Challenge.findOne({ _id: challengeId })
//         // if (!dbChallenge)
//         //     return res.status(404).json({ error: 'Challenge not found' });
        
//         // // update user points
//         // user.points += dbChallenge.pointsReward;

//         // await user.save()

//         const response = {
//             points: user.points,
//             challenge: {
//                 title: dbChallenge.title,
//                 description: dbChallenge.description,
//                 pointsReward: dbChallenge.pointsReward,
//                 isActive: dbChallenge.isActive,
//                 endDate: dbChallenge.endDate,
//                 challengeId: dbChallenge._id,
//                 completed: userChallenge.completed,
//                 answer: userChallenge.answer,
//                 doc: userChallenge.doc,
//                 completedTime: userChallenge.completedTime,
//             },
//         };
//         res.status(200).json(response);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

module.exports = {
    createUser, getUser
};
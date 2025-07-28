const { User, userChallengeSchema } = require('../models/users.model');

const createUserDb = async (email) => {
    const newUser = new User({
        email: email
    });
    await newUser.save();
    return newUser;
}

const getUserDb = async (userId) => {
    return await User.findOne({ _id: userId });
}

// const createUserChallengeDb = async (user, userChallenge) => {
//     const newUserChallenge = userChallengeSchema({
//         challengeId: userChallenge.challengeId,
//         completed: userChallenge.completed,
//         notes: userChallenge.notes,
//         document: userChallenge.document,
//         completedAtTs: userChallenge.completedAtTs
//     });
//     user.challenges.push(newUserChallenge);

//     await user.save();
// }

module.exports = {
    createUserDb, getUserDb
};
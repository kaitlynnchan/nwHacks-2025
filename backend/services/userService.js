const User = require('../models/User');
const UserChallenge = require('../models/UserChallenge');

async function sendChallengeToUsers(challenge) {
    try {
        const users = await User.find({});

        // create a UserChallenge for each user and add it to their profile
        for (let user of users) {
            const newUserChallenge = new UserChallenge({
                challengeId: challenge._id,
                completed: false,
                answer: '',
                doc: '',
                completedTime: null
            });
            // await newUserChallenge.save();

            user.challenges.push(newUserChallenge);
            await user.save();
        }

        console.log(`Challenge "${challenge.title}" has been sent to all users.`);
    } catch (error) {
        console.error('Error sending challenge to users:', error.message);
    }
}

module.exports = { sendChallengeToUsers };

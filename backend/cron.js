const cron = require('node-cron');
const { createRandomChallenge } = require('./challengeService'); // Path to the random challenge creation function
const { sendChallengeToUsers } = require('./userService');  // The function to send challenges to users

// Schedule a task to create and send a new challenge every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        // Step 1: Create a random challenge
        const challenge = await createRandomChallenge();

        // Step 2: Send the created challenge to all users
        await sendChallengeToUsers(challenge);
        
        console.log('Challenge created and sent to all users');
    } catch (err) {
        console.error('Error creating or sending challenge:', err);
    }
});

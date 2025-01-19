const Challenge = require('../models/Challenge');

// Function to create a random challenge
async function createRandomChallenge() {
    const challengeTemplates = [
        {
            title: "Walk 1,000 steps",
            description: "Complete a 1,000 step challenge for today.",
            pointsReward: 20,
        },
        {
            title: "Drink 8 glasses of water",
            description: "Stay hydrated by drinking 8 glasses of water today.",
            pointsReward: 10,
        },
        {
            title: "Read for 30 minutes",
            description: "Read any book or article for at least 30 minutes today.",
            pointsReward: 15,
        },
    ];

    // Pick a random template from the list
    const randomChallenge = challengeTemplates[Math.floor(Math.random() * challengeTemplates.length)];

    // Create and save the challenge
    const newChallenge = new Challenge(randomChallenge);
    await newChallenge.save();
    
    console.log("New challenge created:", newChallenge.title);
    return newChallenge;
}

module.exports = { createRandomChallenge };

const Challenge = require('../models/Challenge');

// Function to create a random challenge
async function createRandomChallenge() {
    const challengeTemplates = [
        { 
          title: "Join a study group", 
          description: "Participate in a study group to enhance your learning experience.", 
          points: 10 
        },
        { 
          title: "Explore a new campus spot", 
          description: "Discover a new location on campus you've never visited before.", 
          points: 5 
        },
        { 
          title: "Participate in a club event", 
          description: "Engage in a club activity to broaden your social network and skills.", 
          points: 15 
        },
        { 
          title: "Make a new friend", 
          description: "Strike up a conversation and connect with someone new on campus.", 
          points: 10 
        },
        { 
          title: "Give a compliment to someone on campus", 
          description: "Brighten someone's day by giving them a genuine compliment.", 
          points: 5 
        },
        { 
          title: "Invite someone new to share lunch with you", 
          description: "Invite a peer or acquaintance to share a meal with you.", 
          points: 10 
        },
        { 
          title: "Find and take a picture of a unique spot on campus", 
          description: "Capture a photo of a unique or beautiful location on campus.", 
          points: 10 
        },
        { 
          title: "Explore a section of the library you've never visited", 
          description: "Discover resources in a part of the library you've never been to before.", 
          points: 5 
        },
        { 
          title: "Locate and snap a photo of a piece of campus art", 
          description: "Find and photograph a piece of art displayed somewhere on campus.", 
          points: 10 
        },
        { 
          title: "Go to a building you've never entered and explore", 
          description: "Step into a building you've never visited and learn about its purpose.", 
          points: 5 
        },
        { 
          title: "Attend a free workshop or seminar happening on campus", 
          description: "Participate in a free educational event to learn something new.", 
          points: 20 
        }
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

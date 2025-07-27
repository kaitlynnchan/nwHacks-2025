// import axios from 'axios';

// const API_URL = '';


// Sample challenges/quests data
const challenges = [
  { 
    "id": "8a10a1bc-3e4f-41e6-9b67-1d091c6f0c20",
    "title": "Join a study group", 
    "description": "Participate in a study group to enhance your learning experience.", 
    "points": 10,
    "difficulty": "Medium",
    "category": "Academic",
    "estimatedtime": 60,
    "requirements": ["Identify or form a group of at least 2 other students.", "Choose a subject/course to focus on.","Meet for at least 30 minutes (in-person or virtual).","Each participant should contribute to the discussion or work."]
  },
  { 
    "id": "ed3f2f77-d6be-4f8e-b9b2-58b5f3829e44",
    "title": "Explore a new campus spot", 
    "description": "Discover a new location on campus you've never visited before.", 
    "points": 5,
    "difficulty": "Easy",
    "category": "Exploration",
    "estimatedtime": 15,
    "requirements": ["Select a location you have never been to on campus.", "Spend at least 10 minutes there.", "Take a photo or make a note of what you discovered."]
  },
  { 
    "id": "c2a7ff85-df1f-4190-acc7-6fcd6635615f",
    "title": "Participate in a club event", 
    "description": "Engage in a club activity to broaden your social network and skills.", 
    "points": 15,
    "difficulty": "Medium",
    "category": "Social",
    "estimatedtime": 90,
    "requirements": ["Attend an event hosted by a registered campus club.", "Actively participate and stay for at least 45 minutes. ", "Optionally, take a photo or get confirmation from a club representative."]
  },
  { 
    "id": "f1d9982e-d02a-4bde-bff8-56f62dd189db",
    "title": "Make a new friend", 
    "description": "Strike up a conversation and connect with someone new on campus.", 
    "points": 10,
    "difficulty": "Medium",
    "category": "Social",
    "estimatedtime": 30,
    "requirements": ["Start a conversation with someone new.","Learn at least two things about them. ","Exchange contact info or plan to meet again. ", "Keep the interaction genuine."]
  },
  { 
    "id": "915a0f02-6f20-4aa9-b4a3-82b1259c61e5",
    "title": "Give a compliment to someone on campus", 
    "description": "Brighten someone's day by giving them a genuine compliment.", 
    "points": 5,
    "difficulty": "Easy",
    "category": "Well-being",
    "estimatedtime": 5,
    "requirements": ["Approach someone respectfully.",
        "Give a sincere, specific, and appropriate compliment.",
        "Ensure the compliment is genuine and contextually appropriate.",
        "Observe and reflect on how the person responds."]
  },
  { 
    "id": "3fc8c2f4-dabf-47d3-9916-f9a5e0c728b4",
    "title": "Invite someone new to share lunch with you", 
    "description": "Invite a peer or acquaintance to share a meal with you.", 
    "points": 10,
    "difficulty": "Medium",
    "category": "Social",
    "estimatedtime": 45,
    "requirements": ["Invite someone you don’t usually eat with.",
        "Share a meal for at least 30 minutes.",
        "Minimize distractions like phones during the meal.",
        "Engage in meaningful conversation."]
  },
  { 
    "id": "d63716e0-7714-4f32-b019-969bbfc36b9e",
    "title": "Find and take a picture of a unique spot on campus", 
    "description": "Capture a photo of a unique or beautiful location on campus.", 
    "points": 10,
    "difficulty": "Easy",
    "category": "Exploration",
    "estimatedtime": 20,
    "requirements": ["Walk around campus with the goal of discovery.",
        "Identify a visually unique or interesting location.",
        "Take a clear photo of the spot.",
        "Be ready to explain what makes it special."]
  },
  { 
    "id": "ca189d90-0ee6-46dc-90b7-b83084f3455c",
    "title": "Explore a section of the library you've never visited", 
    "description": "Discover resources in a part of the library you've never been to before.", 
    "points": 5,
    "difficulty": "Easy",
    "category": "Academic",
    "estimatedtime": 20,
    "requirements": ["Visit a floor, department, or section of the library you haven't seen before.",
        "Spend at least 15 minutes browsing resources.",
        "Note at least one new thing you learned or found.",
        "Optional: Check out a book or talk to a librarian."]
  },
  { 
    "id": "1b78d3eb-fb6f-45d6-9c4f-33b81cbd14b6",
    "title": "Locate and snap a photo of a piece of campus art", 
    "description": "Find and photograph a piece of art displayed somewhere on campus.", 
    "points": 10,
    "difficulty": "Easy",
    "category": "Exploration",
    "estimatedtime": 25,
    "requirements": ["Find a mural, sculpture, or artwork on campus.",
        "Take a photo that includes the art and its location.",
        "If possible, learn about the artist or significance of the piece.",
        "Avoid choosing art already featured in campus brochures."]
  },
  { 
    "id": "46b48c70-b1a7-4c75-a5cc-fad632e0b103",
    "title": "Go to a building you've never entered and explore", 
    "description": "Step into a building you've never visited and learn about its purpose.", 
    "points": 5,
    "difficulty": "Easy",
    "category": "Exploration",
    "estimatedtime": 15,
    "requirements": ["Pick a building you've never entered before.",
        "Enter and explore for at least 10 minutes.",
        "Learn about the building’s purpose or departments inside.",
        "Note something unexpected or interesting about it."]
  },
  { 
    "id": "5782fc3f-9820-476f-8f68-9c36b81a0c84",
    "title": "Attend a free workshop or seminar happening on campus", 
    "description": "Participate in a free educational event to learn something new.", 
    "points": 20,
    "difficulty": "Hard",
    "category": "Academic",
    "estimatedtime": 90,
    "requirements": ["Register for or attend a free educational campus event.",
        "Stay for the full duration or at least 45 minutes.",
        "Take notes or participate in the session.",
        "Collect any handouts or materials provided."]
  }
];

export const fetchChallenges = async () => {
  return challenges;
    // try {
    //   const response = await axios.get(`${API_URL}/challenges`);
    //   console.log(response);
    //   return response.data;
    // } catch (error) {
    //   throw new Error(error.response?.data?.error || "Failed to fetch challenges");
    // }
};

export const fetchChallenge = async (id: string) => {
  return challenges.find(challenge => challenge.id === id);
//   try {
//     const response = await axios.get(`${API_URL}/challenge`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.error || "Failed to fetch challenge");
//   }
};
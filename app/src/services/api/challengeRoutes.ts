import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = '';
// Sample challenges/quests data
const challenges = [
  { 
    id: "sdfasdfasfawsefrasdfasdfasedfaesdf",
    title: "Join a study group", 
    description: "Participate in a study group to enhance your learning experience.", 
    points: 10 
  },
  { 
    id: "sedrtsedr4tsdfge45rsedfrg",
    title: "Explore a new campus spot", 
    description: "Discover a new location on campus you've never visited before.", 
    points: 5 
  },
  { 
    id: "sdfgsdgyhwset5gsdfgsdftrghyed",
    title: "Participate in a club event", 
    description: "Engage in a club activity to broaden your social network and skills.", 
    points: 15 
  },
  { 
    id: "e345t62345rtgsderfgderfg",
    title: "Make a new friend", 
    description: "Strike up a conversation and connect with someone new on campus.", 
    points: 10 
  },
  { 
    id: "sdrfge45rtygsdfgvsdfge54ryq4e5rt",
    title: "Give a compliment to someone on campus", 
    description: "Brighten someone's day by giving them a genuine compliment.", 
    points: 5 
  },
  { 
    id: "dfgsrtyswer5ygsdfgsedrfgtsrfg",
    title: "Invite someone new to share lunch with you", 
    description: "Invite a peer or acquaintance to share a meal with you.", 
    points: 10 
  },
  { 
    id: "sgbser5gsdffgbv4e5wrdstfgt",
    title: "Find and take a picture of a unique spot on campus", 
    description: "Capture a photo of a unique or beautiful location on campus.", 
    points: 10 
  },
  { 
    id: "34t65dfgt54rygdfgsdfgsrdghbsfghs",
    title: "Explore a section of the library you've never visited", 
    description: "Discover resources in a part of the library you've never been to before.", 
    points: 5 
  },
  { 
    id: "ertet54ertgedgvdxfge344rgt",
    title: "Locate and snap a photo of a piece of campus art", 
    description: "Find and photograph a piece of art displayed somewhere on campus.", 
    points: 10 
  },
  { 
    id: "ergerdgdxgtrtghbdfgbrtfthdfrtg",
    title: "Go to a building you've never entered and explore", 
    description: "Step into a building you've never visited and learn about its purpose.", 
    points: 5 
  },
  { 
    id: "sdfsdfadsgadfgadfgadfga",
    title: "Attend a free workshop or seminar happening on campus", 
    description: "Participate in a free educational event to learn something new.", 
    points: 20 
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
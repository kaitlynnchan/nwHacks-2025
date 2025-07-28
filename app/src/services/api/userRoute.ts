import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createUser = async (email: string) => {
  return await axios.post(`${API_URL}/users/`, {email})
    .then((res) => {
      return res.data
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to create user");
    });
};

export const fetchUser = async (email: string) => {
  return await axios.get(`${API_URL}/users/${email}`)
    .then((res) => {
      console.log(res)
      return res.data
    }).catch((err) => {
      console.log(err)
      throw new Error(err!.response!.data?.error || "Failed to fetch user");
    });
};


export const linkChallengeToUser = async (
  userId: string, 
  challengeId: string, 
  notes: string, 
  document: string
) => {
  return await axios.post(`${API_URL}/users/${userId}/challenge/${challengeId}`, {
      completed: true,
      notes: notes,
      document: document,
      completedAtTs: Date.now()
    })
    .then((res) => {
      return res.data
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to link challenge to user");
    });
};

export const fetchUserChallenge = async (userId: string, challengeId: string) => {
  return await axios.get(`${API_URL}/users/${userId}/challenge/${challengeId}`)
    .then((res) => {
      return res.data
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to fetch user challenges");
    });
};

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchChallenges = async () => {
  // return challenges;
  return await axios.get(`${API_URL}/challenges`)
    .then((res) => {
      return res.data
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to fetch challenges");
    });
};

export const fetchChallenge = async (id: string) => {
  // return challenges.find(challenge => challenge.id === id);
  return await axios.get(`${API_URL}/challenges/${id}`)
    .then((res) => {
      return res.data
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to fetch challenges");
    });
};
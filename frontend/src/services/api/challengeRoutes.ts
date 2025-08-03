import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const fetchChallenges = async () => {
  return await axios.get(`${API_URL}/challenges`)
    .then((res) => {
      return res.data
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to fetch challenges");
    });
};

export const fetchChallenge = async (id: string) => {
  return await axios.get(`${API_URL}/challenges/${id}`)
    .then((res) => {
      return res.data
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to fetch challenges");
    });
};
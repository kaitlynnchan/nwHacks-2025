import axios from 'axios';
import { signUpNewUser, signInWithEmail } from "@/services/supabase/client";

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const createUser = async (email: string, password: string) => {
  try {
    const supabaseUser = await signUpNewUser(email, password);

    return await axios.post(`${API_URL}/users`, {
        userId: supabaseUser!.id, 
        email: email 
      })
      .then((res) => {
        return res.data;
      }).catch((err) => {
        throw new Error(err!.response!.data?.error || "Failed to create user");
      });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};
// { 
//         headers: {
//           Authorization: accessToken
//         } 
//       }
export const fetchUser = async (email: string, password: string) => {
  try {
    const { userId, accessToken } = await signInWithEmail(email, password);

    return await axios.get(`${API_URL}/users/${userId}`)
      .then((res) => {
        console.log(res)
        return res.data;
      }).catch((err) => {
        console.log(err)
        throw new Error(err!.response!.data?.error || "Failed to fetch user");
      });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
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
      return res.data;
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to link challenge to user");
    });
};

export const fetchUserChallenges = async (userId: string) => {
  return await axios.get(`${API_URL}/users/${userId}/challenges`)
    .then((res) => {
      return res.data;
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to fetch user challenges");
    });
}

export const fetchUserChallenge = async (userId: string, challengeId: string) => {
  return await axios.get(`${API_URL}/users/${userId}/challenge/${challengeId}`)
    .then((res) => {
      return res.data;
    }).catch((err) => {
      throw new Error(err!.response!.data?.error || "Failed to fetch user challenges");
    });
};

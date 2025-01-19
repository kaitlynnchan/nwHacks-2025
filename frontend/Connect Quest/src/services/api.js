import React, { useEffect, useState } from 'react';
import axios from 'axios';

API_URL = '/api'

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/user/create`, user);
        return response.data;
    } catch (error){
        throw new Error(error.response?.data?.error || "Failed to create user");
    }
}

export const fetchChallenges = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/challenges`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch challenges");
    }
};
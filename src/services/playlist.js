import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://spotify-be-rr00.onrender.com/api/tracks';

// Get auth header from token stored in localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Fetch tracks for logged-in user (email taken from token)
export const fetchTracksByUser = async () => {
  const res = await axios.get(`${API_URL}/user`, getAuthHeader());
  return res.data;
};

// Create a track
export const createTrack = async (trackData) => {
  try {
    const res = await axios.post(API_URL, trackData, getAuthHeader());
    toast.success("Successfully added in playlist");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Already added in Playlist");
  }
};

// Delete a track by ID (email handled in backend via token)
export const deleteTrackByUser = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return res.data;
};

// Update a track by ID
export const updateTrackByUser = async ({ id, name }) => {
  const res = await axios.put(`${API_URL}/${id}`, { name }, getAuthHeader());
  return res.data;
};

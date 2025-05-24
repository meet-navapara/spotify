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

const handleAuthError = (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  if (status === 401) {
    if (message === 'No token provided') {
      toast.error("Please log in to continue");
    } else if (message === 'Invalid token') {
      toast.error("Session expired. Please log in again");
    } else if (message === 'User not found') {
      toast.error("User not found. Please sign in again");
    } else {
      toast.error("Unauthorized access");
    }

    localStorage.removeItem('authToken');
    // Optionally redirect: window.location.href = '/login';
  }
};

// Fetch tracks for logged-in user
export const fetchTracksByUser = async () => {
  try {
    const res = await axios.get(`${API_URL}/user`, getAuthHeader());
    return res.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Create a track
export const createTrack = async (trackData) => {
  try {
    const res = await axios.post(API_URL, trackData, getAuthHeader());
    toast.success("Successfully added in playlist");
    return res.data;
  } catch (error) {
    handleAuthError(error);
    toast.error(error?.response?.data?.message || "Already added in Playlist");
    throw error;
  }
};

// Delete a track by ID
export const deleteTrackByUser = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return res.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

// Update a track by ID
export const updateTrackByUser = async ({ id, name }) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, { name }, getAuthHeader());
    return res.data;
  } catch (error) {
    handleAuthError(error);
    throw error;
  }
};

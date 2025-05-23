import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://spotify-be-rr00.onrender.com/api/tracks';

export const fetchTracksByUser = async (addedBy) => {
  const res = await axios.get(`${API_URL}/user/${addedBy}`);
  return res.data;
};

export const createTrack = async (trackData) => {
    try
    {
        const res = await axios.post(API_URL, trackData);
       toast.success("Successfully added in playlist")
        return res.data;
    }
    catch(error)
    {
        toast.error("Already added in Playlist")
    }

};

export const deleteTrackByUser = async ({ id, addedBy }) => {
  const res = await axios.delete(`${API_URL}/user/${addedBy}/${id}`);
  return res.data;
};

export const updateTrackByUser = async ({ id, addedBy, name }) => {
  console.log('updatedTrack :>> ', name);
  const res = await axios.put(`${API_URL}/user/${addedBy}/${id}`, {name:name});
  return res.data;
};

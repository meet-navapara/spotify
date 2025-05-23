import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PORT,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

export default API;

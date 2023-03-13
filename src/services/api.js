import axios from 'axios';
import { logout } from '../store/actions/auth';
import store from '../store';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PORT,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw err;
  }
);

export default API;

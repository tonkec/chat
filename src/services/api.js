import axios from 'axios';
import { logout } from '../store/actions/auth';
import store from '../store';

const API = axios.create({
  baseURL: 'https://duga-backend.herokuapp.com',
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
    if (err.response.status !== 401) {
      throw err;
    }
    if (err.response.data.name) {
      if (typeof err.response.data.error.name !== 'undefined') {
        if (err.response.data.error.name === 'TokenExpiredError') {
          store.dispatch(logout());
          throw err;
        }
      }
    }
  }
);

export default API;

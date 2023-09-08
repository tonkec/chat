import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PORT,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
})

API.interceptors.response.use(
  function (config) {
    return config
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 500) {
        return Promise.reject(error)
      }
    }
    throw error
  },
)
export default API

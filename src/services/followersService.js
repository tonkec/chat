import api from './api';

const followersService = {
  getFollowers: async userId => {
    const response = await api.get(`/followers/${userId}`);
    return response.data;
  },

  addFollower: async (userId, followerId) => {
    const response = await api.post(`/followers/add`, { userId, followerId });
    return response.data;
  },

  removeFollower: async (userId, followerId) => {
    const response = await api.post(`/followers/remove`, {
      userId,
      followerId,
    });
    return response.data;
  },
};

export default followersService;

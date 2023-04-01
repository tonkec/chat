import api from './api';

const UserService = {
  getAllUsers: () => {
    return api
      .get('/users/get-users')
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default UserService;

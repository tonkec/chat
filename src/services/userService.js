import api from "./api";

const UserService = {
  getAllUsers: () => {
    return api
<<<<<<< HEAD
      .get("/users/get-users")
      .then((res) => {
=======
      .get('/users/get-users')
      .then(res => {
>>>>>>> master
        return res;
      })
      .catch(err => {
        throw err;
      });
  },
  getUser: id => {
    return api
      .get(`/users/${id}`)
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err;
      });
  },
  updateUser: data => {
    return api
<<<<<<< HEAD
      .post("/users/update-user", { data })
      .then((res) => {
=======
      .post('/users/update-user', { data })
      .then(res => {
>>>>>>> master
        return res;
      })
      .catch(err => {
        throw err;
      });
  },
};

export default UserService;

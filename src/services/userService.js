import api from './api'

const UserService = {
  getAllUsers: () => {
    return api
      .get('/users/get-users')
      .then(res => {
        return res
      })
      .catch(err => {
        throw err
      })
  },
  getUser: id => {
    return api
      .get(`/users/${id}`)
      .then(res => {
        return res
      })
      .catch(err => {
        throw err
      })
  },
  updateUser: data => {
    return api
      .post('/users/update-user', { data })
      .then(res => {
        return res
      })
      .catch(err => {
        throw err
      })
  },
}

export default UserService

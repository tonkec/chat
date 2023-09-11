import {
  SET_ONLINE_USERS,
  GET_ALL_USERS,
  GET_USER,
  UPDATE_USER,
} from '../types';

import UserService from '../../services/userService';

export const setOnlineUsers = users => dispatch => {
  dispatch({ type: SET_ONLINE_USERS, payload: users });
};

export const getAllUsers = () => dispatch => {
  return UserService.getAllUsers()
    .then(res => {
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    })
    .catch(e => console.log(e));
};

export const getUser = id => dispatch => {
  return UserService.getUser(id)
    .then(res => {
      dispatch({ type: GET_USER, payload: res.data });
    })
    .catch(e => console.log(e));
};

export const updateUser = data => dispatch => {
  return UserService.updateUser(data)
    .then(res => {
      dispatch({ type: UPDATE_USER, payload: res.data });
    })
    .catch(e => console.log(e));
};

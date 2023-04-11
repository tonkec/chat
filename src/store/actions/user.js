import {
  SET_ONLINE_USERS,
  SET_USER_OFFLINE,
  SET_USER_ONLINE,
  GET_ALL_USERS,
  GET_USER,
} from '../types';

import UserService from '../../services/userService';

export const setOnlineUsers = (users) => (dispatch) => {
  dispatch({ type: SET_ONLINE_USERS, payload: users });
};

export const setUserOffline = (user) => (dispatch) => {
  dispatch({ type: SET_USER_OFFLINE, payload: user });
};

export const setUserOnline = (user) => (dispatch) => {
  dispatch({ type: SET_USER_ONLINE, payload: user });
};

export const getAllUsers = () => (dispatch) => {
  return UserService.getAllUsers()
    .then((res) => {
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    })
    .catch((e) => console.log(e));
};

export const getUser = (id) => (dispatch) => {
  return UserService.getUser(id)
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data });
    })
    .catch((e) => console.log(e));
};

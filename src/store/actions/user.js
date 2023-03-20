import { SET_ONLINE_USERS, SET_USER_OFFLINE, SET_USER_ONLINE } from '../types';

export const setOnlineUsers = (users) => (dispatch) => {
  dispatch({ type: SET_ONLINE_USERS, payload: users });
};

export const setUserOffline = (user) => (dispatch) => {
  dispatch({ type: SET_USER_OFFLINE, payload: user });
};

export const setUserOnline = (user) => (dispatch) => {
  dispatch({ type: SET_USER_ONLINE, payload: user });
};

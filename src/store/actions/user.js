import { SET_ONLINE_USERS } from '../types';

export const setOnlineUsers = (users) => (dispatch) => {
  dispatch({ type: SET_ONLINE_USERS, payload: users });
};

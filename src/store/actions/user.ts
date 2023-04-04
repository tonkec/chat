import User from '../../models/User';
import { SET_ONLINE_USERS, SET_USER_OFFLINE, SET_USER_ONLINE } from '../types';

export const setOnlineUsers = (users: User[]) => (dispatch: (arg0: { type: string; payload: User[]; }) => void) => {
  dispatch({ type: SET_ONLINE_USERS, payload: users });
};

export const setUserOffline = (user: User) => (dispatch: (arg0: { type: string; payload: User; }) => void) => {
  dispatch({ type: SET_USER_OFFLINE, payload: user });
};

export const setUserOnline = (user: User) => (dispatch: (arg0: { type: string; payload: User; }) => void) => {
  dispatch({ type: SET_USER_ONLINE, payload: user });
};

import { SET_ONLINE_USERS, SET_USER_OFFLINE, SET_USER_ONLINE } from '../types';

export const initialState = {
  onlineUsers: [],
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ONLINE_USERS: {
      return {
        ...state,
        onlineUsers: payload,
      };
    }

    case SET_USER_OFFLINE: {
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter(
          (onlineUser) => onlineUser.user.id !== payload.id
        ),
      };
    }

    case SET_USER_ONLINE: {
      if (state.onlineUsers.length === 0) {
        return {
          ...state,
          onlineUsers: state.onlineUsers.push(payload),
        };
      } else {
        return {
          ...state,
          onlineUsers: state.onlineUsers.map((onlineUser) => {
            if (onlineUser.user.id !== payload.id) {
              state.onlineUsers.push({ user: payload });
            }

            return onlineUser;
          }),
        };
      }
    }

    default:
      return state;
  }
};

export default userReducer;

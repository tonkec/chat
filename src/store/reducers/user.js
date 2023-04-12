import {
  GET_ALL_USERS,
  GET_USER,
  SET_ONLINE_USERS,
  SET_USER_OFFLINE,
  SET_USER_ONLINE,
  UPDATE_USER,
} from '../types';

export const initialState = {
  onlineUsers: [],
  allUsers: [],
  user: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case GET_ALL_USERS: {
      return {
        ...state,
        allUsers: payload,
      };
    }
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

    case UPDATE_USER: {
      return {
        ...state,
        user: payload,
      };
    }

    default:
      return state;
  }
};

export default userReducer;

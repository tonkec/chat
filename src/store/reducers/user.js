import {
  GET_ALL_USERS,
  GET_USER,
  SET_ONLINE_USERS,
  SET_USER_OFFLINE,
  SET_USER_ONLINE,
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
      console.log(payload, 'payload SET_ONLINE_USERS');
      const userExists = state.onlineUsers.find(
        (user) => user.id === payload.id
      );
      if (!userExists) {
        return {
          ...state,
          onlineUsers: [...state.onlineUsers, ...payload],
        };
      }
      return state;
    }

    case SET_USER_OFFLINE: {
      // remove user from store if it exists in the store
      const userExists = state.onlineUsers.find(
        (user) => user.id === payload.id
      );
      if (userExists) {
        return {
          ...state,
          onlineUsers: state.onlineUsers.filter(
            (user) => user.id !== payload.id
          ),
        };
      }

      return state;
    }

    case SET_USER_ONLINE: {
      // add user to store if it is not already in the store
      const userExists = state.onlineUsers.find(
        (user) => user.id === payload.id
      );
      if (!userExists) {
        return {
          ...state,
          onlineUsers: [...state.onlineUsers, payload],
        };
      }
      console.log(state);
      return state;
    }

    default:
      return state;
  }
};

export default userReducer;

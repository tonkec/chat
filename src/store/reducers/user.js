import {
  GET_ALL_USERS,
  GET_USER,
  SET_ONLINE_USERS,
  UPDATE_USER,
} from "../types";

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
      return { ...state, onlineUsers: payload };
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

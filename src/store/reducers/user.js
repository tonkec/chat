import { SET_ONLINE_USERS } from '../types';

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

    default:
      return state;
  }
};

export default userReducer;

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_PROFILE,
  FORGOT_PASSWORD,
} from '../types';

export const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || {},
  // token: localStorage.getItem("token") || "",
  // isLoggedIn: !!localStorage.getItem("user"),
  user: {},
  token: '',
  isLoggedIn: false,
  isVerified: null,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: true,
        isVerified: payload.isVerified,
      };
    case REGISTER:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: '',
        isLoggedIn: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        user: payload,
        token: payload.token,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;

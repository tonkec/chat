import {
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_PROFILE,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_RESET_PASSWORD_TOKEN,
  EMAIL_NOT_VERIFIED,
} from '../types';

export const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!localStorage.getItem('user'),
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
    case RESET_PASSWORD:
      return {
        ...state,
        isLoggedIn: false,
        newPassword: payload.password,
      };
    case GET_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        isLoggedIn: false,
        resetPasswordToken: payload.token,
      };
    case EMAIL_NOT_VERIFIED:
      return {
        ...state,
        token: payload.token,
        user: payload,
        isLoggedIn: false,
        isVerified: payload.isVerified,
      };
    default:
      return state;
  }
};

export default authReducer;

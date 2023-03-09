import AuthService from '../../services/authService';
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  UPDATE_PROFILE,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_RESET_PASSWORD_TOKEN,
} from '../types';
export const login = (params, navigate) => (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      const isUserVerified = data.data.isVerified;
      console.log(data);
      dispatch({ type: LOGIN, payload: data.data });
      if (isUserVerified) {
        navigate('/');
      }
    })
    .catch((e) => console.log(e));
};

export const register = (params, navigate) => (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      dispatch({ type: REGISTER, payload: data.data });
      navigate('/login');
    })
    .catch((e) => console.log(e));
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};

export const updateProfile = (params) => (dispatch) => {
  return AuthService.updateProfile(params)
    .then((data) => {
      dispatch({ type: UPDATE_PROFILE, payload: data });
    })
    .catch((err) => {
      throw err;
    });
};

export const forgotPassword = (email, navigate) => (dispatch) => {
  return AuthService.forgotPassword(email)
    .then((res) => {
      dispatch({ type: FORGOT_PASSWORD, payload: res.data });
      navigate('/login');
    })
    .catch((e) => console.log(e));
};

export const resetPassword = (password, email) => (dispatch) => {
  return AuthService.resetPassword(password, email)
    .then((res) => {
      dispatch({ type: RESET_PASSWORD, payload: res.data });
    })
    .catch((e) => console.log(e));
};

export const getResetPasswordToken = (email, token) => (dispatch) => {
  return AuthService.getResetPasswordToken(email, token)
    .then((res) => {
      dispatch({ type: GET_RESET_PASSWORD_TOKEN, payload: res.data });
    })
    .catch((e) => e);
};

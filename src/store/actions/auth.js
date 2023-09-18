import AuthService from "../../services/authService";
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_RESET_PASSWORD_TOKEN,
  EMAIL_NOT_VERIFIED,
<<<<<<< HEAD
} from "../types";
export const login = (params) => async (dispatch) => {
=======
} from '../types';
export const login = params => async dispatch => {
>>>>>>> master
  return AuthService.login(params)
    .then(data => {
      let isUserVerified;
      if (data) {
        isUserVerified = data.data.isVerified;
      }

      if (isUserVerified) {
        dispatch({ type: LOGIN, payload: data.data });
        return data;
      } else {
        if (data) {
          dispatch({ type: EMAIL_NOT_VERIFIED, payload: data.data });
          return data;
        }
      }
    })
    .catch(e => {
      throw e;
    });
};

export const register = params => dispatch => {
  return AuthService.register(params)
    .then(data => {
      dispatch({ type: REGISTER, payload: data.data });
    })
    .catch(e => {
      throw e;
    });
};

export const logout = () => dispatch => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};

export const forgotPassword = (email, navigate) => dispatch => {
  return AuthService.forgotPassword(email)
    .then(res => {
      dispatch({ type: FORGOT_PASSWORD, payload: res.data });
      navigate("/login");
    })
    .catch(e => console.log(e));
};

export const resetPassword = (password, email) => dispatch => {
  return AuthService.resetPassword(password, email)
    .then(res => {
      dispatch({ type: RESET_PASSWORD, payload: res.data });
    })
    .catch(e => console.log(e));
};

export const getResetPasswordToken = (email, token) => dispatch => {
  return AuthService.getResetPasswordToken(email, token)
    .then(res => {
      dispatch({ type: GET_RESET_PASSWORD_TOKEN, payload: res.data });
    })
    .catch(e => e);
};

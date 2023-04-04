import { NavigateFunction } from "react-router-dom";
import User from "../../models/User";
import AuthService from "../../services/authService";
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  UPDATE_PROFILE,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  GET_RESET_PASSWORD_TOKEN,
  EMAIL_NOT_VERIFIED,
} from "../types";



export const login = (params: User) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  return AuthService.login(params)
    .then((data) => {
      let isUserVerified;
      if (data) {
        isUserVerified = data.data.isVerified;
      }

      if (isUserVerified) {
        dispatch({ type: LOGIN, payload: data?.data });
        return data;
      } else {
        if (data) {
          dispatch({ type: EMAIL_NOT_VERIFIED, payload: data.data });
          return data;
        }
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const register = (params: User) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {

  try {
    const data_1 = await AuthService.register(params);
    dispatch({ type: REGISTER, payload: data_1.data });
  } catch (e) {
    throw e;
  }
};

export const logout = () => (dispatch: (arg0: { type: string; }) => void) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};

/* not available currently */
/* export const updateProfile = (params: User) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  return AuthService.updateProfile(params)
    .then((data: any) => {
      dispatch({ type: UPDATE_PROFILE, payload: data });
    })
    .catch((err: any) => {
      throw err;
    });
}; */

export const forgotPassword = (email: string, navigate: NavigateFunction) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await AuthService.forgotPassword(email);
    dispatch({ type: FORGOT_PASSWORD, payload: res.data });
    navigate("/login");
  } catch (e) {
    return console.log(e);
  }
};

export const resetPassword = (password: string, email: string) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await AuthService.resetPassword(password, email);
    dispatch({ type: RESET_PASSWORD, payload: res.data });
  } catch (e) {
    return console.log(e);
  }
};

export const getResetPasswordToken = (email: string, token: string) => async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
  try {
    const res = await AuthService.getResetPasswordToken(email, token);
    dispatch({ type: GET_RESET_PASSWORD_TOKEN, payload: res.data });
  } catch (e) {
    return e;
  }
};

import AuthService from '../../services/authService';
import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE } from '../types';
export const login = (params, navigate) => (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      dispatch({ type: LOGIN, payload: data.data });
      navigate('/');
    })
    .catch((e) => console.log(e));
};

export const register = (params, navigate) => (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      dispatch({ type: REGISTER, payload: data.data });
      // navigate("/");
    })
    .catch((e) => console.log(e));
};

export const logout = (navigate) => (dispatch) => {
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

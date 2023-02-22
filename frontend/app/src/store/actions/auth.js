import AuthService from "../../services/authService";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const LOGOUT = "LOGOUT";

export const login = (params, navigate) => (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      dispatch({ type: LOGIN, payload: data.data });
      navigate("/");
    })
    .catch((e) => console.log(e));
};

export const register = (params, navigate) => (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      dispatch({ type: REGISTER, payload: data.data });
      navigate("/");
    })
    .catch((e) => console.log(e));
};

export const logout = (navigate) => (dispatch) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};

import api from "./api";
const AuthService = {
  login: (data) => {
    return api
      .post("/login")
      .then((res) => {
        api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  register: () => {},
  logout: () => {},
};

export default AuthService;

import api from "./api";
const AuthService = {
  login: (data) => {
    return api
      .post("/login", data)
      .then((res) => {
        api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;
        return res;
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  register: (data) => {
    return api
      .post("/register", data)
      .then((res) => {
        api.defaults.headers["Authorization"] = `Bearer ${res.data.token}`;
        return res;
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  logout: () => {},
};

export default AuthService;

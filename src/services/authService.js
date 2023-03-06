import api from "./api";
const AuthService = {
  login: (data) => {
    return api
      .post("/login", data)
      .then((res) => {
        saveUserToLocalStorage(res.data);
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
        saveUserToLocalStorage(res.data);
        return res;
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  logout: () => {
    api.defaults.headers["Authorization"] = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};

const saveUserToLocalStorage = (data) => {
  api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", data.token);
};

export default AuthService;

import api from "./api";
const AuthService = {
  login: (data: any) => {
    return api
      .post("/login", data)
      .then((res) => {
        if (res) {
          if (res.data) {
            saveUserToLocalStorage(res.data);
            return res;
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  register: (data: any) => {
    return api
      .post("/register", data)
      .then((res) => {
        saveUserToLocalStorage(res.data);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  },
  logout: () => {
    api.defaults.headers["Authorization"] = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  forgotPassword: (email: string) => {
    return api
      .post("/forgot-password", { email })
      .then((res) => res)
      .catch((e) => e);
  },
  resetPassword: (password:string, email: string) => {
    return api
      .post("/reset-password", { password, email })
      .then((res) => res)
      .catch((e) => e);
  },
  getResetPasswordToken: (email: string, token: string) => {
    return api
      .post("/verification-token", { email, token })
      .then((res) => res)
      .catch((e) => e);
  },
};

const saveUserToLocalStorage = (data: { token: string; }) => {
  api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", data.token);
};

export default AuthService;

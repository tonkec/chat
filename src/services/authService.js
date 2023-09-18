import api from "./api";
const AuthService = {
  login: data => {
    return api
<<<<<<< HEAD
      .post("/login", data)
      .then((res) => {
=======
      .post('/login', data)
      .then(res => {
>>>>>>> master
        if (res) {
          if (res.data) {
            saveUserToLocalStorage(res.data);
            return res;
          }
        }
      })
      .catch(err => {
        throw err;
      });
  },
  register: data => {
    return api
<<<<<<< HEAD
      .post("/register", data)
      .then((res) => {
=======
      .post('/register', data)
      .then(res => {
>>>>>>> master
        saveUserToLocalStorage(res.data);
        return res;
      })
      .catch(err => {
        throw err;
      });
  },
  logout: () => {
    api.defaults.headers["Authorization"] = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("online");
  },
  forgotPassword: email => {
    return api
<<<<<<< HEAD
      .post("/forgot-password", { email })
      .then((res) => res)
      .catch((e) => e);
  },
  resetPassword: (password, email) => {
    return api
      .post("/reset-password", { password, email })
      .then((res) => res)
      .catch((e) => e);
  },
  getResetPasswordToken: (email, token) => {
    return api
      .post("/verification-token", { email, token })
      .then((res) => res)
      .catch((e) => e);
  },
};

const saveUserToLocalStorage = (data) => {
  api.defaults.headers["Authorization"] = `Bearer ${data.token}`;
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("token", data.token);
=======
      .post('/forgot-password', { email })
      .then(res => res)
      .catch(e => e);
  },
  resetPassword: (password, email) => {
    return api
      .post('/reset-password', { password, email })
      .then(res => res)
      .catch(e => e);
  },
  getResetPasswordToken: (email, token) => {
    return api
      .post('/verification-token', { email, token })
      .then(res => res)
      .catch(e => e);
  },
};

const saveUserToLocalStorage = data => {
  api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token', data.token);
>>>>>>> master
};

export default AuthService;

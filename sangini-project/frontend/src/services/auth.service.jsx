import axios from "axios";

const API_URL = "http://127.0.0.1:4000/users/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username:username,
        password:password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password) {
    return axios
      .post(API_URL + "register", {
        username:email,
        password:password
      })
      .then(response => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response.data;
      });

  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
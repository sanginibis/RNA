import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:4000/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'test');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
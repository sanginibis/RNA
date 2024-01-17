import axios from 'axios';

async function callApi(url, method = 'GET', data = {}, headers = {}) {
  try {
    let response;

    if (method === 'GET') {
      response = await axios.get(url, { headers });
    } else {
      response = await axios({
        method,
        url,
        data,
        headers,
      });
    }

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error; // Re-throw the error for further handling by the caller
  }
}


// api.js
const login = async (username, password) => {
  // API logic for login
};

const logout = async () => {
  // API logic for logout
};

export { callApi };
import axios from 'axios';
import { getAuthToken } from './jwt';

async function callApi(url, method = 'GET', data = {}, requireAuth=true) {

  let token = getAuthToken();
  if (!requireAuth) token='';
  
  try {
    let response;

    if (method === 'GET') {
      response = await axios.get(url, { headers:{
        'Content-Type': 'application/json',
        'authorization': token,
      } });
    } else {
      response = await axios.post(url,data, 
        {
          headers: {
                      'Content-Type': 'application/json',
                      'authorization': token,
          } 
        } 
      );
    }

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error; // Re-throw the error for further handling by the caller
  }
}

export { callApi };
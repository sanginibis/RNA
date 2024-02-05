/* 
This component is used to provide a common method for making API calls.
*/

import axios from 'axios';
import { getAuthToken } from './authenticationToken';

async function callApi(url, method = 'GET', data = {}, requireAuth=true) {

  let token = getAuthToken(); // get the authorization token for calls that require authorizations
  if (!requireAuth) token=''; // if a call needs to be without authorization then set the token as null
  
  try {
    let response;

    // handle the GET and POST calls
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
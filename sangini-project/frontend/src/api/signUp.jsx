/* 
This component is used to make the backend API call to signup.
*/

import { callApi } from "./restAPICaller";
import { signupAPIurl } from "../common/constants";

// ----- for signup api ------
const signUpAPI = async (signupData) => {

  let response = {}; // initialize empty response

  try {
      const apiUrl = signupAPIurl;
      const requireAuth = false;
      const responseData = await callApi(apiUrl, 'POST', signupData, requireAuth);

      response = responseData;

  } catch (error) {
      response = {}
  }

  return response;
};


export { signUpAPI};
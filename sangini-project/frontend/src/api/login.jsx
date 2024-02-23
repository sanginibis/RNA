/* 
This component is used to make the backend API call to login.
*/

import { callApi } from "./restAPICaller";
import { loginAPIurl } from "../common/constants";

// ----- for login ------
const loginAPI = async (loginData) => {

  let response = {}; // initialize the response to be empty

  try {
      const apiUrl = loginAPIurl;
      const requireAuth = false;
      const responseData = await callApi(apiUrl, 'POST', loginData, requireAuth);

      response = responseData;

  } catch (error) {
      response = {message: "There is some connectivity issue. Please try after sometime.", err_no: "101"}
  }

  return response;
};


export { loginAPI};
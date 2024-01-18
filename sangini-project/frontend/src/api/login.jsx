import { callApi } from "./restAPICaller";
import { getAuthToken } from "./jwt";


const headers = {
  'Content-Type': 'application/json',
  'authorization': getAuthToken()
};

// ----- for getting the bioinfo related data for the RNA sequence ------
const loginAPI = async (loginData) => {

  let response = {};

  try {
      const apiUrl = "http://localhost:4000/users/login"
      const responseData = await callApi(apiUrl, 'POST', loginData, headers);

      response = responseData;

  } catch (error) {
      response = {}
  }

  return response;
};


export { loginAPI};
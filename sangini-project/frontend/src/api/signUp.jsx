import { callApi } from "./restAPICaller";
import { getAuthToken } from "./jwt";

const headers = {
  'Content-Type': 'application/json',
  'authorization': getAuthToken()
};

// ----- for getting the bioinfo related data for the RNA sequence ------
const signUpAPI = async (signupData) => {

  let response = {};

  try {
      const apiUrl = "http://localhost:4000/users/register"
      const responseData = await callApi(apiUrl, 'POST', signupData, headers);

      response = responseData;

  } catch (error) {
      response = {}
  }

  return response;
};


export { signUpAPI};
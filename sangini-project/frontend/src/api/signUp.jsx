import { callApi } from "./restAPICaller";

// ----- for getting the bioinfo related data for the RNA sequence ------
const signUpAPI = async (signupData) => {

  let response = {};

  try {
      const apiUrl = "http://localhost:4000/users/register";
      const requireAuth = false;
      const responseData = await callApi(apiUrl, 'POST', signupData, requireAuth);

      response = responseData;

  } catch (error) {
      response = {}
  }

  return response;
};


export { signUpAPI};
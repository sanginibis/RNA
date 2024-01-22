import { callApi } from "./restAPICaller";

// ----- for getting the bioinfo related data for the RNA sequence ------
const loginAPI = async (loginData) => {

  let response = {};

  try {
      const apiUrl = "http://localhost:4000/users/login";
      const requireAuth = false;
      const responseData = await callApi(apiUrl, 'POST', loginData, requireAuth);

      response = responseData;

  } catch (error) {
      response = {}
  }

  return response;
};


export { loginAPI};
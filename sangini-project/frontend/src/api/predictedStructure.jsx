import { callApi } from "./restAPICaller";

const headers = {
  'Content-Type': 'application/json'
};

// ----- for getting the Nussinov predicted structure ------
const nussinovPredictedStructure = async (rnaSequence) => {

  let predictedStructure = "";

  try {
    if (rnaSequence) {
      const apiUrl = "http://localhost:4000/users/dashboard/nussinov"
      const data = { "rna_sequence": rnaSequence }
      const responseData = await callApi(apiUrl, 'POST', data, headers);
      predictedStructure = responseData.data.nussinov;
    }
  } catch (error) {
      // when there is error, no structure will be predicted
      predictedStructure = ""
  }

  return predictedStructure;
};


// ----- for getting the Zuker predicted structure ------
const zukerPredictedStructure = async (rnaSequence) => {

  let predictedStructure = "";

  try {
    if (rnaSequence) {
      const apiUrl = "http://localhost:4000/users/dashboard/zuker"
      const data = { "rna_sequence": rnaSequence }
      const responseData = await callApi(apiUrl, 'POST', data, headers);
      predictedStructure = responseData.data.zuker;
    }
  } catch (error) {
      // when there is error, no structure will be predicted
      predictedStructure = ""
  }

  return predictedStructure;
};

export { nussinovPredictedStructure, zukerPredictedStructure};
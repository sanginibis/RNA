/* 
This component is used to make the backend API call to get predicted structure.
*/

import { callApi } from "./restAPICaller";
import { nussinovAPIurl, zukerAPIurl } from "../common/constants";


// ----- for getting the Nussinov predicted structure ------
const nussinovPredictedStructure = async (rnaSequence) => {

  let predictedStructure = "";

  try {
    if (rnaSequence) {
      const apiUrl = nussinovAPIurl;
      const data = { "rna_sequence": rnaSequence };
      const responseData = await callApi(apiUrl, 'POST', data);
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
      const apiUrl = zukerAPIurl;
      const data = { "rna_sequence": rnaSequence };
      const responseData = await callApi(apiUrl, 'POST', data);
      predictedStructure = responseData.data.zuker;
    }
  } catch (error) {
      // when there is error, no structure will be predicted
      predictedStructure = ""
  }

  return predictedStructure;
};

export { nussinovPredictedStructure, zukerPredictedStructure};
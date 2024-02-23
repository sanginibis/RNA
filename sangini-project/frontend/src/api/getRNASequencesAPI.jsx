/* 
This component is used to make the backend API call to save the bio info
*/


import { callApi } from "./restAPICaller"; // the generic rest api caller handler
import { getRNASequences } from "../common/constants";

// ----- for saving the bioinfo related data ------
const getRNASequencesAPI = async () => {

  let rnaSequences = {}; // initialized to empty

  try {
    // if the sequence is provided then call the bioinfo api
    const apiUrl = getRNASequences;
    const data = {};
    const responseData = await callApi(apiUrl, 'POST', data);
    rnaSequences = responseData.data;
  } catch (error) {
      // when there is error, no data will be retrieved
      rnaSequences = {message: "There is some connectivity issue. Please try after sometime.", err_no: "101"}

  }
  return rnaSequences[0];
};


export { getRNASequencesAPI};
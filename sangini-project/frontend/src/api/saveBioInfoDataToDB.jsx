/* 
This component is used to make the backend API call to save the bio info
*/


import { callApi } from "./restAPICaller"; // the generic rest api caller handler
import { saveBioInfoDataAPIurl } from "../common/constants";

// ----- for saving the bioinfo related data ------
const saveBioInfoDataToDB = async (rnaName, rnaSequence) => {

  let bioinfoData = {}; // initialized to empty

  try {
    // if the sequence is provided then call the bioinfo api
    if (rnaSequence) {
      const apiUrl = saveBioInfoDataAPIurl;
      const data = { "rna_name": rnaName, "rna_sequence": rnaSequence };
      const responseData = await callApi(apiUrl, 'POST', data);
      bioinfoData = responseData.data;
    }
  } catch (error) {
      // when there is error, no data will be retrieved
      bioinfoData = {}
  }

  return bioinfoData;
};


export { saveBioInfoDataToDB};
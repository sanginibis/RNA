/* 
This component is used to make the backend API call to get the bio info data.
*/


import { callApi } from "./restAPICaller"; // the generic rest api caller handler
import { bioinfoDataAPIurl } from "../common/constants";

// ----- for getting the bioinfo related data for the RNA sequence ------
const getBioInfoData = async (rnaSequence) => {

  let bioinfoData = {}; // initialized to empty

  try {
    // if the sequence is provided then call the bioinfo api
    if (rnaSequence) {
      const apiUrl = bioinfoDataAPIurl;
      const data = { "rna_sequence": rnaSequence };
      const responseData = await callApi(apiUrl, 'POST', data);
      bioinfoData = responseData.data;
    }
  } catch (error) {
      // when there is error, no data will be retrieved
      bioinfoData = {}
  }

  return bioinfoData;
};


export { getBioInfoData};
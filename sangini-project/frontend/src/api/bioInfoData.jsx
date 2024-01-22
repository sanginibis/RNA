import { callApi } from "./restAPICaller";

// ----- for getting the bioinfo related data for the RNA sequence ------
const getBioInfoData = async (rnaSequence) => {

  let bioinfoData = {};

  try {
    if (rnaSequence) {
      const apiUrl = "http://localhost:4000/users/dashboard/bioinfo";
      const data = { "rna_sequence": rnaSequence };
      const responseData = await callApi(apiUrl, 'POST', data);
      bioinfoData = responseData.data;
    }
  } catch (error) {
      // when there is error, no structure will be predicted
      bioinfoData = {}
  }

  return bioinfoData;
};


export { getBioInfoData};
import codonTable from './codonTable.json';
import axios from 'axios';

async function callApi(url, method = 'GET', data = {}, headers = {}) {
  try {
    let response;

    if (method === 'GET') {
      response = await axios.get(url, { headers });
    } else {
      response = await axios({
        method,
        url,
        data,
        headers,
      });
    }

    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error; // Re-throw the error for further handling by the caller
  }
}


// api.js
const login = async (username, password) => {
  // API logic for login
};

const logout = async () => {
  // API logic for logout
};

// Other API functions...


function getAminoAcids(rnaCodonString) {
    let nextId = 1;
    const aminoAcidDetails = [];
    let currentCodon = "";
    let currentPosition = 0;

    for (let i = 0; i < rnaCodonString.length; i += 3) {
      currentCodon = rnaCodonString.substr(i, 3);
      const aminoAcid = codonTable[currentCodon];

      if (aminoAcid) {
        const existingIndex = aminoAcidDetails.findIndex((aa) => aa.code === aminoAcid.code);

        if (existingIndex !== -1) {
          // Update existing entry
          const existingEntry = aminoAcidDetails[existingIndex];
          existingEntry.count++;
          existingEntry.positions.push(currentPosition);
          existingEntry.codon = `${existingEntry.codon}, ${currentCodon}`; // Append codon
        } else {
          // Create new entry
          aminoAcidDetails.push({
            id: nextId++,
            code: aminoAcid.code,
            name: aminoAcid.name,
            count: 1,
            codon: currentCodon,
            positions: [currentPosition+1],
          });
        }
      } else {
        // Handle incomplete codons
        if (currentCodon.length < 3) {
          aminoAcidDetails.push({
            id: nextId++,
            code: "Incomplete",
            name: "Incomplete codon",
            count: 1,
            codon: currentCodon,
            positions: [currentPosition+1],
          });
        }
      }

      currentPosition += 3;
    }

    return aminoAcidDetails;
  };


export { login, logout, getAminoAcids, callApi };
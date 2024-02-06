const axios = require('axios');
const url = require('../config/url.config');
const bioDB = require('./bioinfo.db.services');
const jwtToken = require('../middlewares/auth');

const headers = {
    'Content-Type': 'application/json'
};

// function to get the required data for db operations
async function dbDATA(request){
    
    let dataObj; // initialise the data object
    const data = await jwtToken.getDataFromToken(request.headers["authorization"]); // get the data from header token
    
    const user_id = data.id; // get the user id stored in the header. all data will be stored for the user
    const rna_name =  request.body.rna_name;
    const rna_sequence = request.body.rna_sequence;

    // if user id exists
    if (user_id>0) {

        // call the rest api to get the bio info
        const bioInfoAPIURL = url.bioinfo.base + url.bioinfo.bioinfo;
        const bioInfoData = await bioinfo_call_apis(bioInfoAPIURL, 'POST', {"rna_sequence" : rna_sequence}, headers);

        // call the rest api to get the nussinov structure
        const nussinovAPIURL = url.bioinfo.base + url.bioinfo.nussinov
        const nussinovData = await bioinfo_call_apis(nussinovAPIURL, 'POST', {"rna_sequence" : rna_sequence}, headers);

        // call the rest api to get the zuker structure
        const zukerAPIURL = url.bioinfo.base + url.bioinfo.zuker
        const zukerData = await bioinfo_call_apis(zukerAPIURL, 'POST', {"rna_sequence" : rna_sequence}, headers);

        // now setup the data object
        dataObj = {
            user_id : user_id,
            rna_name : rna_name,
            rna_sequence : rna_sequence,
            nussinov_structure : nussinovData.nussinov,
            zuker_structure: zukerData.zuker,
            amino_acids_data : bioInfoData.translated_codons,
            bio_info_details: bioInfoData.bio_info_details
        };
    
    }


    return dataObj;
}

// function that calls the bioinfo flask rest apis
function bioinfo_call_apis(apiUrl, method, data = null, headers = {}) {
    return axios({
        method,
        url: apiUrl,
        data,
        headers
    })
        .then(response => response.data) // Resolve with response data
        .catch(error => Promise.reject(error)); // Reject with error
}


// get the bioinfo
const bioinfo = async function (req, callback) {
    
    const apiUrl = url.bioinfo.base + url.bioinfo.bioinfo;
    const rnaSequence = req.body;
    let responseData = "";

    try {
        responseData = await bioinfo_call_apis(
            apiUrl,
            'POST',
            rnaSequence,
            headers
        );
    } catch (error) {
        return callback({ message: error, err_code: "BIOINFO_API_CALL_FAILED", err_no: "201" });
    }

    // before sending the response to 
    return callback(null, responseData);
}

// get the nussinov structure
const nussinov = async function (req, callback) {

    const apiUrl = url.bioinfo.base + url.bioinfo.nussinov
    const rnaSequence = req.body;
    let responseData = "";

    try {
        responseData = await bioinfo_call_apis(
            apiUrl,
            'POST',
            rnaSequence,
            headers
        );
    } catch (error) {
        return callback({ message: error, err_code: "NUSSINOV_API_CALL_FAILED", err_no: "202" });
    }

    return callback(null, responseData);
}

// get the zuker structure
const zuker = async function (req, callback) {

    const apiUrl = url.bioinfo.base + url.bioinfo.zuker;
    const rnaSequence = req.body;
    let responseData = "";

    try {
        responseData = await bioinfo_call_apis(
            apiUrl,
            'POST',
            rnaSequence,
            headers
        );
    } catch (error) {
        return callback({ message: error, err_code: "ZUKER_API_CALL_FAILED", err_no: "203" });
    }

    return callback(null, responseData);
}


// create the bio info data
const saveBioInfoData = async function (req, callback) {

    const apiUrl = url.bioinfo.base + url.bioinfo.saveBioInfoData
    const dataObj = await dbDATA(req);

    let responseData = "";

    try {

            // create the data to store the rna name and the sequence
            if (await bioDB.users_rna_sequences(dataObj.user_id, dataObj.rna_name, dataObj.rna_sequence)){
                //get the id for the created data
                const urs_id = await bioDB.get_users_rna_sequences(dataObj.user_id, dataObj.rna_name);

                // if the sequence id is found
                if (urs_id>0){

                    // create the predicted structure for nussinov
                    if (!await bioDB.urs_nussinov_predicted_structure(urs_id, dataObj.nussinov_structure)){
                        console.log('error nussinov');
                    };

                    // create the predicted structure for zuker
                    if (!await bioDB.urs_zuker_predicted_structure(urs_id, dataObj.rna_sequence, dataObj.zuker_structure)){
                        console.log('error zuker');
                    };

                    // create the bio info
                    if (!await bioDB.urs_sequences_bio_info(urs_id, dataObj.bio_info_details)){
                        console.log('error bio info');
                    };

                    // create the amino acid data
                    if (!await bioDB.urs_sequences_amino_acids(urs_id, dataObj.amino_acids_data)){
                        console.log('error amino acids');
                    };
                }
            }

        responseData = { message: 'successfully created data'};

    } catch (error) {
        return callback({ message: error, err_code: "SAVE_BIO_INFO_DATA_FAILED", err_no: "202" });
    }

    return callback(null, responseData);
}

module.exports = {
    bioinfo,
    nussinov,
    zuker,
    saveBioInfoData
}
const axios = require('axios');
const url = require('../config/url.config');
const bioDB = require('./bioinfo.db.services');
const jwtToken = require('../middlewares/auth');
const sql = require('../db/db.sql');

const headers = {
    'Content-Type': 'application/json'
};

// function to get the required data for db operations
async function dbDATA(request){
    
    let dataObj; // initialise the data object
    let urs_id=0;
    const data = await jwtToken.getDataFromToken(request.headers["authorization"]); // get the data from header token
    
    const user_id = data.id; // get the user id stored in the header. all data will be stored for the user
    const rna_name =  request.body.rna_name;
    const rna_sequence = request.body.rna_sequence;

    let nussinovStructure = "";
    let zukerStructure = "";

    // if user id exists
    if (user_id>0) {

        //initialise by getting the rna sequence data for the rna name
        let dataURS = await bioDB.get_users_rna_sequences(user_id, rna_name);
        urs_id = dataURS.id;

        // to avoid getting the predicted structure from the bio info apis if the rna_sequence has not changed
        if (urs_id>0) {
            // check whether the rna_Sequence provided in the request is same as in the database
            if (dataURS.rnaSequence === rna_sequence) {
                // get the nussinov predicted structure from the database
                nussinovStructure = await bioDB.get_predicted_nussinov_stucture(dataURS.id); 

                // get the zuker predicted structure from the database
                zukerStructure = await bioDB.get_predicted_zuker_stucture(dataURS.id); 
            }
        } else { // create the users rna sequence data since it has not been created or it differs
            const bCreate = await bioDB.users_rna_sequences(user_id, rna_name, rna_sequence);
            dataURS = await bioDB.get_users_rna_sequences(user_id, rna_name);
            urs_id = dataURS.id;    
        }       

        // now get the data from the bio info APIs ---------------------------------------------------

        // call the rest api to get the bio info
        const bioInfoAPIURL = url.bioinfo.base + url.bioinfo.bioinfo;
        const bioInfoData = await bioinfo_call_apis(bioInfoAPIURL, 'POST', {"rna_sequence" : rna_sequence}, headers);

        // call the rest api to get the nussinov structure
        if (nussinovStructure.length===0) {
            const nussinovAPIURL = url.bioinfo.base + url.bioinfo.nussinov
            const nussinovData = await bioinfo_call_apis(nussinovAPIURL, 'POST', {"rna_sequence" : rna_sequence}, headers);
            nussinovStructure = nussinovData.nussinov;
        }

        // call the rest api to get the zuker structure
        if (zukerStructure.length===0) {
            const zukerAPIURL = url.bioinfo.base + url.bioinfo.zuker
            const zukerData = await bioinfo_call_apis(zukerAPIURL, 'POST', {"rna_sequence" : rna_sequence}, headers);
            zukerStructure = zukerData.zuker;
        }

        // now setup the data object
        dataObj = {
            user_id : user_id,
            urs_id: urs_id,
            rna_name : rna_name,
            rna_sequence : rna_sequence,
            nussinov_structure : nussinovStructure,
            zuker_structure: zukerStructure,
            amino_acids_data : bioInfoData.translated_codons,
            bio_info_details: bioInfoData.bio_info_details
        };    
        console.log(dataObj);
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
    const dataObj = await dbDATA(req); // prefill the dataObj with the relevant data

    let responseData = "";

    try {
            const urs_id = dataObj.urs_id;

            // if the sequence id is found
            if (urs_id>0){

                // create the predicted structure for nussinov
                if (!await bioDB.urs_nussinov_predicted_structure(urs_id, dataObj.nussinov_structure)){
                    console.log('error nussinov');
                };

                // create the predicted structure for zuker
                if (!await bioDB.urs_zuker_predicted_structure(urs_id, dataObj.zuker_structure)){
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

        responseData = {dataObj};

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
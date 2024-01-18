const axios = require('axios');
const url = require('../config/url.config');
const bioDB = require('./bioinfo.db.services');
const jwtToken = require('../middlewares/auth');

const headers = {
    'Content-Type': 'application/json'
};

// function to get the required data for db operations
async function dbDATA(request){
    let dataObj;
    const data = await jwtToken.getDataFromToken(request.headers["authorization"]);
    dataObj = {
        user_id : data.id,
        rna_sequence : request.body.rna_sequence,
        urs_id : await bioDB.get_users_rna_sequences(data.id,request,body.rna_sequence)
    };
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

module.exports = {
    bioinfo,
    nussinov,
    zuker
}
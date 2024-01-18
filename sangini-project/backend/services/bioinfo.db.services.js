const url = require('../db/db.sql');
const pool = require('../db/dbConnection'); // get the connection pool for query executions
const sql = require('../db/db.sql');

// get the users_rna_sequences id so that other detail tables can have records
const get_users_rna_sequences = async function (user_id, rna_sequence) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlGetUsersRNASequence;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlURS, [user_id, rna_sequence]);

        connection.release();

        return data;

    } catch (error) {
        return null;
    }    
}


// create the data into users_rna_sequences (urs)
const users_rna_sequences = async function (user_id, rna_sequence) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlCreateUserRNASequence;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlURS, [user_id, rna_sequence]);

        connection.release();

        return data;

    } catch (error) {
        return null;
    }    
}

// create the data into urs_nussinov_structure or urs_zuker_structure
const urs_predicted_structure = async function (user_id, rna_sequence, predicted_structure, isNussinov) {
    try {

        // create the sql statement
        let sqlURS = sql.sqlCreateRNASequenceNussinov;
        if (!isNussinov) sqlURS = sql.sqlCreateRNASequenceZuker;

        const ursData = get_users_rna_sequences(user_id, rna_sequence);
        const ursId = ursData[0].id;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlURS, [ursId, predicted_structure]);

        connection.release();

        return data;

    } catch (error) {
        return null;
    }    
}



// get the bioinfo
const bioinfo = async function (data, response) {
    
    const userid = data.user_id;
    const username = data.username;

    // update the database with the data
    try {

        // create the sql statement
        const sqlUser = sql.sqlGetUser;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlUser, [username]);


        if (data[0].length > 0) {
            const dbPassword = data[0][0].password;

            //match whether the hashed passwords matches
            if (await matchPassword(dbPassword, password) === false) {
                bNext = false;
            }
            
        } else {
            bNext = false;
        }

        if (!bNext) {
            // audit it
            const dataAudit = await connection
            .query(sqlAudit, [username, 'FAILED', 'Login - Username or Password provided is not valid.', helper.getCurrentDateTime()]);
            connection.release();

            return callback({ message: "Username or Password provided is not valid", err_code: "INVALID_CREDENTIALS", err_no: "101" });
        } 

        // gerenate the access token
        const user_id = data[0][0].id;
        const token = await auth.generateAccessToken(user_id, username);

        // audit it
        const dataAudit = await connection
        .query(sqlAudit, [username, 'SUCCESS', 'Login', helper.getCurrentDateTime()]);
        connection.release();

        return callback(null, { id: user_id, username: data[0][0].username, token: token });

    } catch (error) {
        return callback({ error }, null);
    }    





















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
    
    console.log(responseData.bio_info_details[0].name);
    for (let i = 0; i < responseData.bio_info_details.length; i++) {
        console.log(responseData.bio_info_details[i].data);
        console.log(responseData.bio_info_details[i].name);
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
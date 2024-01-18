const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const pool = require('../db/dbConnection'); // get the connection pool for query executions
const sql = require('../db/db.sql');
const helper = require('./helpers');

const sqlAudit = sql.sqlCreateUserAudit;

//generate the passcode
const getPasscode = () => {
    const min = 1;
    const max = 999999;

    return Math.floor(Math.random() * (max - min + 1) + min);
}

// match the password
const matchPassword = async function (userPassword, loginPassword) {
    const match = await bcrypt.compare(loginPassword, userPassword);
    return match;
}


// this service lets the user login
async function login(params, callback) {

    let bNext = true;

    // destructure and get the fields from the params
    const { username, password } = params;

    // username is required
    if (username === undefined || username === "") {
        return callback({ message: "Username is required" });
    }

    // password is required
    if (password === undefined || password === "") {
        return callback({ message: "Password is required" });
    }

    // find the user, match the hashed password and send the response
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

}

// This service method is used to signup a user.
async function register(params, callback) {

    console.log(params);

    // destructure and get the fields from the params
    const { firstname, lastname, username, password, organisation, accepted } = params;

    // userExists(username, callback);

    // username is required
    if (username === undefined || username==="") {
        return callback({ message: "Username is required" });
    }

    // password is required
    if (password === undefined || password === "") {
        return callback({ message: "Password is required" });
    }
    
    // now get a connections, insert data and send the response
    try {

        // create the sql statement
        const sqlUsers = sql.sqlCreateUser;
        const sqlProfile = sql.sqlCreateUserProfile;

        // get the connection from the pool
        const connection = await pool.getConnection();

        // create the user
        const dataUsers = await connection
            .query(sqlUsers, [username, password]);
        
        const usersId = dataUsers[0].insertId;

        // create the users profile
        if (usersId>0){
            const dataProfile = await connection
            .query(sqlProfile, [usersId, firstname, lastname, organisation, accepted]);
        }
        
        // audit it
        const dataAudit = await connection
        .query(sqlAudit, [username, 'SUCCESS', 'User Registration', helper.getCurrentDateTime()]);
        
        connection.release();

        // generate the access token
        const token = await auth.generateAccessToken(usersId,username);

        return callback(null, { id: usersId, username: username, token: token });

    } catch (error) {
        if (error.errno == "1062") {
            return callback({ message: "Username already exists", err_code: error.code, err_no: error.errno });
        }
        return callback({message : error});
    } 

}

module.exports = {
    login,
    register
}
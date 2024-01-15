const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const pool = require('../db/dbConnection'); // get the connection pool for query executions

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
        const sql = "SELECT * FROM users WHERE username = ?";

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sql, [username]);

        connection.release();

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
            return callback({ message: "Username or Password provided is not valid", err_code: "INVALID_CREDENTIALS", err_no: "101" });
        } 

        // gerenate the access token
        const token = auth.generateAccessToken(params);
        return callback(null, { id: data[0][0].id, username: data[0][0].username, token: token });

    } catch (error) {
        return callback({ error }, null);
    }

}


// This method checks whether the username already exists in the database
async function userExists(username, callback) {
    // now get a connections, insert data and send the response
    try {

        // create the sql statement
        const sql = "SELECT * FROM users WHERE username = ?";

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sql, [username]);

        connection.release();
        console.log(data)
        return callback(null, data[0]);

    } catch (error) {
        return callback({ error }, null);
    }
}


// This service method is used to signup a user.
async function register(params, callback) {

    // destructure and get the fields from the params
    const { username, password } = params;

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
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sql, [username, password]);
        
        connection.release();
        console.log(data[0].insertId)

        // generate the access token
        const token = auth.generateAccessToken(params);
        return callback(null, { id: data[0].insertId, username: username, token: token });

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
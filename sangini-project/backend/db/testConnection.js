const pool = require('./dbConnection');


async function connect() {
    try {

        const connection = await pool.getConnection();
        console.log('Connected to the MySQL server.');

        connection.query
        // Example: SELECT * FROM users

        connection.release();
    } catch (error) {
        console.error('Error connecting to the MySQL server:', error);
    }
};

module.exports = {
    connect
}
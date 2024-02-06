const url = require('../db/db.sql');
const pool = require('../db/dbConnection'); // get the connection pool for query executions
const sql = require('../db/db.sql');

// get the users_rna_sequences id so that other detail tables can have records
const get_users_rna_sequences = async function (user_id, rna_name) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlGetUsersRNASequence;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlURS, [user_id, rna_name]);

        connection.release();

        return data[0][0];

    } catch (error) {
        return null;
    }    
}


// get the nussinov predicted structure from the database
const get_predicted_nussinov_stucture = async function (urs_id) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlGetNussinovPredictedStructure;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlURS, [urs_id]);

        connection.release();

        return data[0][0].predicted_structure;

    } catch (error) {
        return null;
    }    
}

// get the zuker predicted structure from the database
const get_predicted_zuker_stucture = async function (urs_id) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlGetZukerPredictedStructure;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlURS, [urs_id]);

        connection.release();

        return data[0][0].predicted_structure;

    } catch (error) {
        return null;
    }    
}

// create the data into users_rna_sequences (urs)
const users_rna_sequences = async function (user_id, rna_name, rna_sequence) {
    try {

        // get the connection from the pool
        const connection = await pool.getConnection();

        // get the URS Id
        const dataURS = await get_users_rna_sequences(user_id, rna_name); // get the rna sequence id
        const ursId = dataURS.id;

        // update the data into urs
        const sqlURSUpdate =  "UPDATE users_rna_sequences SET rna_sequence = '" + rna_sequence + "'" + " WHERE id = " + ursId;
        const updateURS = await connection.query(sqlURSUpdate, [ursId]);

        console.log('updateURS', updateURS);
        // means there was an update
        if (updateURS[0].affectedRows>0){
            return true;
        }

        // create the URS
        const sqlURS = sql.sqlCreateUserRNASequence;

        // create the row
        const data = await connection.query(sqlURS, [user_id, rna_name, rna_sequence]);

        connection.release();

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }    
}

// create the data into urs_nussinov_structure
const urs_nussinov_predicted_structure = async function (urs_id, predicted_structure) {
    try {

        // create the sql statement
        let sqlURS = sql.sqlCreateRNASequenceNussinov;
        let sqlURSDelete = sql.sqlDeleteRNASequenceNussinov;
        
        if (urs_id>0) {
            // get the connection from the pool
            const connection = await pool.getConnection();
            
            // delete old record
            const del = await connection
                .query(sqlURSDelete, [urs_id]);

            // create new record
            const data = await connection
                .query(sqlURS, [urs_id, predicted_structure]);

            connection.release();

            return true;
        } else return false;

    } catch (error) {
        console.log(error);
        return false;
    }    
}

// create the data into urs_zuker_structure
const urs_zuker_predicted_structure = async function (urs_id, predicted_structure) {
    try {

        // create the sql statement
        let sqlURS = sql.sqlCreateRNASequenceZuker;
        let sqlURSDelete = sql.sqlDeleteRNASequenceZuker;

        if (urs_id>0) {
            // get the connection from the pool
            const connection = await pool.getConnection();

            // delete old record
            const del = await connection
                .query(sqlURSDelete, [urs_id]);

            // create new record
            const data = await connection
                .query(sqlURS, [urs_id, predicted_structure]);

            connection.release();

            return true;
        } else return false;

    } catch (error) {
        console.log(error);
        return false;
    }    
}

// create the data into urs_sequences_bio_info to hold the bio info details
const urs_sequences_bio_info = async function (urs_id, bioinfo_data) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlCreateRNASequenceBioInfo;
        const sqlURSDelete =  sql.sqlDeleteRNASequenceBioInfo;

        if (urs_id>0){
            // get the connection from the pool
            const connection = await pool.getConnection();

            // delete old record
            const del = await connection
                .query(sqlURSDelete, [urs_id]);

            // since the bio info data is an array so loop it and insert each record
            for (let i = 0; i < bioinfo_data.length; i++) {
                const name = bioinfo_data[i].name;
                const data = bioinfo_data[i].data;

                const dataCreated = await connection
                .query(sqlURS, [urs_id, name, data]);            
            }        
            connection.release();

            return true;
        } else return false;

    } catch (error) {
        console.log(error);
        return false;
    }    
}

// create the data into urs_sequences_amino_acids to hold the translated data
const urs_sequences_amino_acids = async function (urs_id, amino_acids_data) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlCreateRNASequenceAminoAcids;
        const sqlURSDelete =  sql.sqlDeleteRNASequenceAminoAcids;

        if (urs_id>0) {
            // get the connection from the pool
            const connection = await pool.getConnection();

            // delete old record
            const del = await connection
                .query(sqlURSDelete, [urs_id]);            
            
            // since the translated_codons is an array so loop it and insert each record
            for (let i = 0; i < amino_acids_data.length; i++) {
                const amino_acid_code = amino_acids_data[i].code.toString();
                const amino_acid_name = amino_acids_data[i].name.toString();
                const amino_acid_codons = amino_acids_data[i].codon.toString();
                const amino_acid_count = amino_acids_data[i].count.toString();
                const amino_acid_positions = amino_acids_data[i].positions.toString();

                const dataCreated = await connection
                .query(sqlURS, [urs_id, amino_acid_code, amino_acid_name, amino_acid_codons, amino_acid_count, amino_acid_positions]);            
            }        
            connection.release();

            return true;
        } else return false;

    } catch (error) {
        console.log(error);
        return false;
    }    
}

module.exports = {
    get_users_rna_sequences,
    get_predicted_nussinov_stucture,
    get_predicted_zuker_stucture,
    users_rna_sequences,
    urs_nussinov_predicted_structure,
    urs_zuker_predicted_structure,
    urs_sequences_bio_info,
    urs_sequences_amino_acids
}
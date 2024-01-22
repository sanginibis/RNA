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

        return data[0].id;

    } catch (error) {
        return null;
    }    
}




// create the data into users_rna_sequences (urs)
const users_rna_sequences = async function (user_id, rna_sequence) {
    try {

        const ursData = get_users_rna_sequences(user_id, rna_sequence); // get the rna sequence id
        const ursId = ursData[0].id;

        if (ursId>0) return true;

        // create the sql statement
        const sqlURS = sql.sqlCreateUserRNASequence;

        // get the connection from the pool
        const connection = await pool.getConnection();
        const data = await connection
            .query(sqlURS, [user_id, rna_sequence]);

        connection.release();

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }    
}

// create the data into urs_nussinov_structure or urs_zuker_structure
const urs_predicted_structure = async function (user_id, rna_sequence, predicted_structure, isNussinov) {
    try {

        // create the sql statement
        let sqlURS = sql.sqlCreateRNASequenceNussinov;
        if (!isNussinov) sqlURS = sql.sqlCreateRNASequenceZuker;

        let sqlURSDelete = sql.sqlDeleteRNASequenceNussinov;
        if (!isNussinov) sqlURSDelete = sql.sqlDeleteRNASequenceZuker;

        const ursData = get_users_rna_sequences(user_id, rna_sequence); // get the rna sequence id
        const ursId = ursData[0].id;

        if (ursId>0) {
            // get the connection from the pool
            const connection = await pool.getConnection();

            // delete old record
            const del = await connection
                .query(sqlURSDelete, [ursId]);

            const data = await connection
                .query(sqlURS, [ursId, predicted_structure]);

            connection.release();

            return true;
        } else return false;

    } catch (error) {
        console.log(error);
        return false;
    }    
}

// create the data into urs_sequences_bio_info to hold the bio info details
const urs_sequences_bio_info = async function (user_id, rna_sequence, bioinfo_data) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlCreateRNASequenceBioInfo;
        const sqlURSDelete =  sql.sqlDeleteRNASequenceBioInfo;

        const ursData = get_users_rna_sequences(user_id, rna_sequence); // get the rna sequence id
        const ursId = ursData[0].id;

        if (ursId>0){
            // get the connection from the pool
            const connection = await pool.getConnection();

            // delete old record
            const del = await connection
                .query(sqlURSDelete, [ursId]);

            // since the bio info data is an array so loop it and insert each record
            for (let i = 0; i < bioinfo_data.bio_info_details.length; i++) {
                const name = bioinfo_data.bio_info_details[i].name;
                const data = bioinfo_data.bio_info_details[i].data;

                const dataCreated = await connection
                .query(sqlURS, [ursId, name, data]);            
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
const urs_sequences_amino_acids = async function (user_id, rna_sequence, amino_acids_data) {
    try {

        // create the sql statement
        const sqlURS = sql.sqlCreateRNASequenceAminoAcids;
        const sqlURSDelete =  sql.sqlDeleteRNASequenceAminoAcids;


        const ursData = get_users_rna_sequences(user_id, rna_sequence); // get the rna sequence id
        const ursId = ursData[0].id;

        if (ursId>0) {
            // get the connection from the pool
            const connection = await pool.getConnection();

            // delete old record
            const del = await connection
                .query(sqlURSDelete, [ursId]);            
            
            // since the translated_codons is an array so loop it and insert each record
            for (let i = 0; i < amino_acids_data.translated_codons.length; i++) {
                const amino_acid_code = amino_acids_data.translated_codons[i].code.toString();
                const amino_acid_name = amino_acids_data.translated_codons[i].name.toString();
                const amino_acid_codons = amino_acids_data.translated_codons[i].count.codon();
                const amino_acid_count = amino_acids_data.translated_codons[i].count.toString();
                const amino_acid_positions = amino_acids_data.translated_codons[i].positions.toString();

                const dataCreated = await connection
                .query(sqlURS, [ursId, amino_acid_code, amino_acid_name, amino_acid_codons, amino_acid_count, amino_acid_positions]);            
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
    users_rna_sequences,
    urs_predicted_structure,
    urs_sequences_bio_info,
    urs_sequences_amino_acids
}
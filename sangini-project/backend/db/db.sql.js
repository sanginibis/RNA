const sqlCreateUser = "INSERT INTO users (username, password) VALUES (?, ?)";
const sqlCreateUserProfile = "INSERT INTO users_profile (users_id, firstname, lastname, organisation, accepted) VALUES (?, ?, ?, ?, ?)";
const sqlCreateUserAudit = "INSERT INTO users_audit (username, status, description, date_time) VALUES (?, ?, ?, ?)";

const sqlCreateUserRNASequence = "INSERT INTO users_rna_sequences (users_id, rna_name, rna_sequence) VALUES (?, ?, ?)";
const sqlCreateRNASequenceNussinov = "INSERT INTO urs_nussinov_structure (urs_id, predicted_structure) VALUES (?, ?)";
const sqlCreateRNASequenceZuker = "INSERT INTO urs_zuker_structure (urs_id, predicted_structure) VALUES (?, ?)";
const sqlCreateRNASequenceAminoAcids = "INSERT INTO urs_sequences_amino_acids (urs_id, amino_acid_code, amino_acid_name, amino_acid_codons, amino_acid_count, amino_acid_positions) VALUES (?, ?, ?, ?, ?, ?)";
const sqlCreateRNASequenceBioInfo = "INSERT INTO urs_sequences_bio_info (urs_id, name, data) VALUES (?, ?, ?)";

const sqlGetUser = "SELECT * FROM users where username = ?"
const sqlGetUserProfile = "SELECT users.id, users.username, users_profile.firstname, users_profile.lastname, users_profile.organisaion FROM users, users_profile WHERE users.id = users_profile.users_id AND users.id = ?";
const sqlGetUserAllRNASequences = "SELECT users.id, users_rna_sequences.rna_sequence, users_rna_sequences.nussinov_predicted_structure, users_rna_sequences.zuker_predicted_structure FROM users, users_rna_sequences WHERE users.id = users_rna_sequences.users_id AND users.id = ?";
const sqlGetUsersRNASequence = "SELECT id, users_id, rna_sequence FROM users_rna_sequences WHERE users_id = ? AND rna_name = ?";

const sqlDeleteRNASequence = "DELETE FROM users_rna_sequences WHERE id = ?";
const sqlDeleteRNASequenceNussinov = "DELETE FROM urs_nussinov_structure WHERE urs_id = ?";
const sqlDeleteRNASequenceZuker = "DELETE FROM urs_zuker_structure WHERE urs_id = ?";
const sqlDeleteRNASequenceAminoAcids = "DELETE FROM urs_sequences_amino_acids WHERE urs_id = ?";
const sqlDeleteRNASequenceBioInfo = "DELETE FROM urs_sequences_bio_info WHERE urs_id = ?";


module.exports={
    sqlCreateUser,
    sqlCreateUserProfile,
    sqlCreateUserAudit,
    sqlCreateUserRNASequence,
    sqlCreateRNASequenceNussinov,
    sqlCreateRNASequenceZuker,
    sqlCreateRNASequenceAminoAcids,
    sqlCreateRNASequenceBioInfo,
    sqlGetUser,
    sqlGetUserProfile,
    sqlGetUserAllRNASequences,
    sqlGetUsersRNASequence,
    sqlDeleteRNASequence,
    sqlDeleteRNASequenceNussinov,
    sqlDeleteRNASequenceZuker,
    sqlDeleteRNASequenceAminoAcids,
    sqlDeleteRNASequenceBioInfo
}



CREATE DATABASE db_rna;
CREATE USER 'db_rna_admin'@'localhost' IDENTIFIED BY 'Babi2006@';
GRANT ALL PRIVILEGES ON db_rna.* TO 'db_rna_admin'@'localhost' WITH GRANT OPTION;
CREATE USER 'db_rna_user'@'localhost' IDENTIFIED BY 'Babi2006@';



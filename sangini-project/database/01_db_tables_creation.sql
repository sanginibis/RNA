-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_rna
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_rna
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_rna` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db_rna` ;

-- -----------------------------------------------------
-- Table `db_rna`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_type` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `idx_users_id` ON `db_rna`.`users` (`id` ASC) VISIBLE;

CREATE UNIQUE INDEX `idx_users_username` ON `db_rna`.`users` (`username` ASC) VISIBLE;

CREATE INDEX `idx_users_id_user_type` ON `db_rna`.`users` (`id` ASC, `user_type` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_rna`.`users_rna_sequences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`users_rna_sequences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `rna_sequence` TEXT NOT NULL,
  `rna_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_urs_users_id`
    FOREIGN KEY (`users_id`)
    REFERENCES `db_rna`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 58
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `idx_users_rna_sequences_users_id_rna_name` ON `db_rna`.`users_rna_sequences` (`users_id` ASC, `rna_name` ASC) VISIBLE;

CREATE INDEX `fk_urs_users_id_idx` ON `db_rna`.`users_rna_sequences` (`users_id` ASC) INVISIBLE;


-- -----------------------------------------------------
-- Table `db_rna`.`urs_nussinov_structure`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`urs_nussinov_structure` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `urs_id` INT NOT NULL,
  `predicted_structure` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_urs_id_nussinov`
    FOREIGN KEY (`urs_id`)
    REFERENCES `db_rna`.`users_rna_sequences` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 245
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_urs_id_nussinov` ON `db_rna`.`urs_nussinov_structure` (`urs_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_rna`.`urs_sequences_amino_acids`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`urs_sequences_amino_acids` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `urs_id` INT NOT NULL,
  `amino_acid_code` VARCHAR(20) NULL DEFAULT NULL,
  `amino_acid_name` VARCHAR(45) NULL DEFAULT NULL,
  `amino_acid_codons` VARCHAR(500) NULL DEFAULT NULL,
  `amino_acid_count` INT NULL DEFAULT NULL,
  `amino_acid_positions` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_urs_id`
    FOREIGN KEY (`urs_id`)
    REFERENCES `db_rna`.`users_rna_sequences` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3421
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_urs_id_idx` ON `db_rna`.`urs_sequences_amino_acids` (`urs_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_rna`.`urs_sequences_bio_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`urs_sequences_bio_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `urs_id` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `data` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_urs_id_bioinfo`
    FOREIGN KEY (`urs_id`)
    REFERENCES `db_rna`.`users_rna_sequences` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2081
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_urs_id_idx` ON `db_rna`.`urs_sequences_bio_info` (`urs_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_rna`.`urs_zuker_structure`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`urs_zuker_structure` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `urs_id` INT NOT NULL,
  `predicted_structure` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_urs_id_zuker`
    FOREIGN KEY (`urs_id`)
    REFERENCES `db_rna`.`users_rna_sequences` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 246
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `fk_urs_id_zuker` ON `db_rna`.`urs_zuker_structure` (`urs_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `db_rna`.`users_audit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`users_audit` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `date_time` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_rna`.`users_profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_rna`.`users_profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `organisation` VARCHAR(45) NOT NULL,
  `accepted` VARCHAR(1) NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_users_id`
    FOREIGN KEY (`users_id`)
    REFERENCES `db_rna`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `id_UNIQUE` ON `db_rna`.`users_profile` (`id` ASC) VISIBLE;

CREATE UNIQUE INDEX `users_id_UNIQUE` ON `db_rna`.`users_profile` (`users_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_id` (`id`),
  UNIQUE KEY `idx_users_username` (`username`),
  KEY `idx_users_id_user_type` (`id`,`user_type`)
);

CREATE TABLE `users_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `organisation` varchar(45) NOT NULL,
  `date_of_brith` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `users_id_UNIQUE` (`users_id`),
  CONSTRAINT `fk_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `users_rna_sequences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `rna_sequence` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_urs_users_id_idx` (`users_id`),
  CONSTRAINT `fk_urs_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `users_audit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `urs_sequences_pngs` (
  `id` int NOT NULL,
  `urs_id` int NOT NULL,
  `model_image` blob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_urs_pngs_id_idx` (`urs_id`),
  CONSTRAINT `fk_urs_pngs_id` FOREIGN KEY (`urs_id`) REFERENCES `users_rna_sequences` (`id`)
);

CREATE TABLE `urs_sequences_amino_acids` (
  `id` int NOT NULL AUTO_INCREMENT,
  `urs_id` int NOT NULL,
  `amino_acid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_urs_id_idx` (`urs_id`),
  CONSTRAINT `fk_urs_id` FOREIGN KEY (`urs_id`) REFERENCES `users_rna_sequences` (`id`)
);
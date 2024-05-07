-- CreateTable
CREATE TABLE `clients` (
    `idClients` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_client` VARCHAR(45) NOT NULL,
    `prenom_client` VARCHAR(45) NOT NULL,
    `adress` VARCHAR(45) NOT NULL,
    `ville_client` VARCHAR(45) NOT NULL,
    `num_tele` VARCHAR(45) NOT NULL,
    `email_client` VARCHAR(45) NOT NULL,
    `id_entreprise` INTEGER NULL,

    UNIQUE INDEX `idClients_UNIQUE`(`idClients`),
    PRIMARY KEY (`idClients`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entreprise` (
    `id_entreprise` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(45) NOT NULL,
    `siege` VARCHAR(45) NOT NULL,
    `date_creation` DATE NOT NULL,
    `id_fiscal` VARCHAR(45) NOT NULL,
    `capital` VARCHAR(45) NOT NULL,
    `nbre_employé` INTEGER NOT NULL,
    `ville` VARCHAR(45) NOT NULL,
    `Responsable` VARCHAR(45) NOT NULL,
    `num_tele` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_entreprise_UNIQUE`(`id_entreprise`),
    PRIMARY KEY (`id_entreprise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facture` (
    `ID_Facture` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_Facture` DATE NULL,
    `ID_Client` INTEGER NULL,

    INDEX `ID_Client`(`ID_Client`),
    PRIMARY KEY (`ID_Facture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ligne_facture` (
    `ID_Facture` INTEGER NOT NULL,
    `ID_Produit` INTEGER NOT NULL,
    `Quantite` INTEGER NULL,

    INDEX `ID_Produit`(`ID_Produit`),
    PRIMARY KEY (`ID_Facture`, `ID_Produit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produit` (
    `Ref_Produit` INTEGER NOT NULL AUTO_INCREMENT,
    `prix_achat` VARCHAR(45) NOT NULL,
    `prix_vente` VARCHAR(45) NOT NULL,
    `taux_marge` VARCHAR(45) NOT NULL,
    `dimension` VARCHAR(45) NOT NULL,
    `taille` VARCHAR(45) NOT NULL,
    `Produitcol` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Ref_Produit_UNIQUE`(`Ref_Produit`),
    PRIMARY KEY (`Ref_Produit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_id_entreprise_fkey` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE SET NULL ON UPDATE CASCADE;

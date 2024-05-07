/*
  Warnings:

  - Made the column `id_entreprise` on table `clients` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id_entreprise` to the `produit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `clients_id_entreprise_fkey` ON `clients`;

-- AlterTable
ALTER TABLE `clients` MODIFY `id_entreprise` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `produit` ADD COLUMN `id_entreprise` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `clients` ADD CONSTRAINT `clients_id_entreprise_fkey` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produit` ADD CONSTRAINT `produit_id_entreprise_fkey` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise`(`id_entreprise`) ON DELETE RESTRICT ON UPDATE CASCADE;

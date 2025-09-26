/*
  Warnings:

  - Added the required column `filePath` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `material` ADD COLUMN `filePath` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `content` on the `report` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` DROP COLUMN `content`,
    ADD COLUMN `filePath` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL DEFAULT 0;

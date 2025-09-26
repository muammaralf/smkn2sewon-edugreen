/*
  Warnings:

  - You are about to drop the column `content` on the `material` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedBy` on the `material` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `material` DROP FOREIGN KEY `Material_uploadedBy_fkey`;

-- DropIndex
DROP INDEX `Material_uploadedBy_fkey` ON `material`;

-- AlterTable
ALTER TABLE `material` DROP COLUMN `content`,
    DROP COLUMN `uploadedBy`;

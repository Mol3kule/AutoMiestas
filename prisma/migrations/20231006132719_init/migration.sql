/*
  Warnings:

  - Added the required column `type` to the `make_models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `make_models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `make_models` ADD COLUMN `type` VARCHAR(40) NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

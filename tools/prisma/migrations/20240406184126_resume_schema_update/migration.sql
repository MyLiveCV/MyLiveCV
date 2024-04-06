/*
  Warnings:

  - Made the column `downloads` on table `Resume` required. This step will fail if there are existing NULL values in that column.
  - Made the column `views` on table `Resume` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "downloads" SET NOT NULL,
ALTER COLUMN "views" SET NOT NULL;

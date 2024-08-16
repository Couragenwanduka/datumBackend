/*
  Warnings:

  - Made the column `bloodGroup` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `term` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradeLevel` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classSection` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "bloodGroup" SET NOT NULL,
ALTER COLUMN "term" SET NOT NULL,
ALTER COLUMN "gradeLevel" SET NOT NULL,
ALTER COLUMN "classSection" SET NOT NULL;

/*
  Warnings:

  - The `gradeLevel` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `classSection` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `gradeLevel` on the `Result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `classSection` on the `Result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `term` on the `Result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Term" AS ENUM ('FirstTerm', 'SecondTerm', 'ThirdTerm');

-- CreateEnum
CREATE TYPE "ClassSection" AS ENUM ('Purity', 'Peace', 'Love', 'Wisdom', 'Joy');

-- CreateEnum
CREATE TYPE "GradeLevel" AS ENUM ('Jss1', 'Jss2', 'Jss3', 'Sss1', 'Sss2', 'Sss3');

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "gradeLevel",
ADD COLUMN     "gradeLevel" "GradeLevel" NOT NULL,
DROP COLUMN "classSection",
ADD COLUMN     "classSection" "ClassSection" NOT NULL,
DROP COLUMN "term",
ADD COLUMN     "term" "Term" NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "term" "Term",
DROP COLUMN "gradeLevel",
ADD COLUMN     "gradeLevel" "GradeLevel",
DROP COLUMN "classSection",
ADD COLUMN     "classSection" "ClassSection";

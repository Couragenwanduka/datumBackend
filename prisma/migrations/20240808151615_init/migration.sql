/*
  Warnings:

  - Made the column `relationship` on table `Parent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactNumber` on table `Parent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nationality` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentAddress` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permanentAddress` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gradeLevel` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classSection` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parentEmail` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Teacher');

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentEmail_fkey";

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "relationship" SET NOT NULL,
ALTER COLUMN "contactNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "nationality" SET NOT NULL,
ALTER COLUMN "currentAddress" SET NOT NULL,
ALTER COLUMN "permanentAddress" SET NOT NULL,
ALTER COLUMN "gradeLevel" SET NOT NULL,
ALTER COLUMN "classSection" SET NOT NULL,
ALTER COLUMN "photo" SET NOT NULL,
ALTER COLUMN "parentEmail" SET NOT NULL;

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "hireDate" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_key" ON "Administrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_contactNumber_key" ON "Administrator"("contactNumber");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentEmail_fkey" FOREIGN KEY ("parentEmail") REFERENCES "Parent"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

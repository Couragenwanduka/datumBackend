/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `currentAddress` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `hireDate` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `classSection` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `gradeLevel` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `classSection` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `currentAddress` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gradeLevel` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Parent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodGroup` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentRole` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localGovernment` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherName` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateOfOrign` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surName` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `Administrator` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `otherName` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surName` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `average` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `midTermTest` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherName` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surName` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `term` on the `Result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classTier` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localGovernment` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otherName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousSchool` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateOfOrign` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `classLevel` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Present', 'Absent', 'Late');

-- CreateEnum
CREATE TYPE "ClassDivision" AS ENUM ('Purity', 'Peace', 'Love', 'Wisdom', 'Joy');

-- CreateEnum
CREATE TYPE "Class" AS ENUM ('Jss1', 'Jss2', 'Jss3', 'Sss1', 'Sss2', 'Sss3');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('Active', 'Transferred', 'Expelled', 'Graduated', 'Other');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "ClassLevel" AS ENUM ('JuniorSecondarySchool', 'SeniorSecondarySchool');

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_subjectId_fkey";

-- DropIndex
DROP INDEX "Administrator_contactNumber_key";

-- DropIndex
DROP INDEX "Attendance_studentId_subjectId_date_key";

-- DropIndex
DROP INDEX "Subject_code_key";

-- AlterTable
CREATE SEQUENCE administrator_id_seq;
ALTER TABLE "Administrator" DROP COLUMN "contactNumber",
DROP COLUMN "currentAddress",
DROP COLUMN "hireDate",
DROP COLUMN "lastName",
DROP COLUMN "permanentAddress",
DROP COLUMN "photo",
DROP COLUMN "subject",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "employmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employmentRole" TEXT NOT NULL,
ADD COLUMN     "gradeLevel" TEXT NOT NULL DEFAULT 'levelOne',
ADD COLUMN     "localGovernment" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "otherName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL,
ADD COLUMN     "stateOfOrign" TEXT NOT NULL,
ADD COLUMN     "step" TEXT NOT NULL DEFAULT 'stepOne',
ADD COLUMN     "surName" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('administrator_id_seq'),
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'Teacher';
ALTER SEQUENCE administrator_id_seq OWNED BY "Administrator"."id";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "subjectId",
ADD COLUMN     "dayOfWeek" TEXT NOT NULL DEFAULT 'Monday',
ADD COLUMN     "time" TEXT NOT NULL DEFAULT '00:00',
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
CREATE SEQUENCE parent_id_seq;
ALTER TABLE "Parent" DROP COLUMN "contactNumber",
DROP COLUMN "lastName",
ADD COLUMN     "otherName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "surName" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('parent_id_seq');
ALTER SEQUENCE parent_id_seq OWNED BY "Parent"."id";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "classSection",
DROP COLUMN "gradeLevel",
DROP COLUMN "lastName",
ADD COLUMN     "average" TEXT NOT NULL,
ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "midTermTest" TEXT NOT NULL,
ADD COLUMN     "otherName" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "surName" TEXT NOT NULL,
ADD COLUMN     "total" TEXT NOT NULL,
DROP COLUMN "term",
ADD COLUMN     "term" TEXT NOT NULL;

-- AlterTable
CREATE SEQUENCE student_id_seq;
ALTER TABLE "Student" DROP COLUMN "classSection",
DROP COLUMN "currentAddress",
DROP COLUMN "gradeLevel",
DROP COLUMN "lastName",
DROP COLUMN "permanentAddress",
DROP COLUMN "photo",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "class" "Class" NOT NULL,
ADD COLUMN     "classTier" "ClassDivision" NOT NULL,
ADD COLUMN     "localGovernment" TEXT NOT NULL,
ADD COLUMN     "otherName" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL,
ADD COLUMN     "previousSchool" TEXT NOT NULL,
ADD COLUMN     "stateOfOrign" TEXT NOT NULL,
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'Active',
ADD COLUMN     "statusChangeDate" TIMESTAMP(3),
ADD COLUMN     "statusReason" TEXT,
ADD COLUMN     "surName" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('student_id_seq'),
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "enrollmentDate" SET DEFAULT CURRENT_TIMESTAMP;
ALTER SEQUENCE student_id_seq OWNED BY "Student"."id";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "code",
ADD COLUMN     "classLevel" "ClassLevel" NOT NULL;

-- DropTable
DROP TABLE "Enrollment";

-- DropEnum
DROP TYPE "ClassSection";

-- DropEnum
DROP TYPE "GradeLevel";

-- CreateTable
CREATE TABLE "Timetable" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "class" "Class" NOT NULL,
    "classTier" "ClassDivision" NOT NULL,
    "subject" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeOfWork" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "class" "Class" NOT NULL,
    "term" "Term" NOT NULL,
    "objectives" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchemeOfWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "schemeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remarks" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "remark" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Remarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_phoneNumber_key" ON "Administrator"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_phoneNumber_key" ON "Parent"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "SchemeOfWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

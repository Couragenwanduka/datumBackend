/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Present', 'Absent', 'Late');

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_subjectId_fkey";

-- DropIndex
DROP INDEX "Attendance_studentId_subjectId_date_key";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "subjectId",
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;

-- DropTable
DROP TABLE "Enrollment";

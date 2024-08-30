/*
  Warnings:

  - You are about to drop the column `stateOfOrign` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `Timetable` table. All the data in the column will be lost.
  - Added the required column `stateOfOrigin` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `class` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `class` on the `Remarks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `term` on the `Result` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `class` on the `SchemeOfWork` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `classId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classId` to the `Timetable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Administrator" DROP COLUMN "stateOfOrign",
ADD COLUMN     "stateOfOrigin" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "administrator_id_seq";

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "teacherId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "class",
ADD COLUMN     "class" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "parent_id_seq";

-- AlterTable
ALTER TABLE "Remarks" DROP COLUMN "class",
ADD COLUMN     "class" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "term",
ADD COLUMN     "term" "Term" NOT NULL;

-- AlterTable
ALTER TABLE "SchemeOfWork" DROP COLUMN "class",
ADD COLUMN     "class" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "class",
ADD COLUMN     "classId" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "student_id_seq";

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "class",
ADD COLUMN     "classId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Class";

-- CreateTable
CREATE TABLE "ClassTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classTier" "ClassDivision" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumina" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "currentStatus" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alumina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alumina_studentId_key" ON "Alumina"("studentId");

-- AddForeignKey
ALTER TABLE "Alumina" ADD CONSTRAINT "Alumina_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

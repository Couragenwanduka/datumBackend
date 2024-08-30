/*
  Warnings:

  - You are about to drop the column `classTier` on the `ClassTable` table. All the data in the column will be lost.
  - You are about to drop the column `classTier` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `Student` table. All the data in the column will be lost.
  - Added the required column `tierId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- AlterTable
CREATE SEQUENCE administrator_id_seq;
ALTER TABLE "Administrator" ALTER COLUMN "id" SET DEFAULT nextval('administrator_id_seq');
ALTER SEQUENCE administrator_id_seq OWNED BY "Administrator"."id";

-- AlterTable
ALTER TABLE "ClassTable" DROP COLUMN "classTier";

-- AlterTable
CREATE SEQUENCE student_id_seq;
ALTER TABLE "Student" DROP COLUMN "classTier",
DROP COLUMN "term",
ADD COLUMN     "tierId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('student_id_seq');
ALTER SEQUENCE student_id_seq OWNED BY "Student"."id";

-- CreateTable
CREATE TABLE "Tier" (
    "id" SERIAL NOT NULL,
    "teir" "ClassDivision" NOT NULL,
    "classLevel" "ClassLevel" NOT NULL,
    "classId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassEnrollment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "tierId" INTEGER NOT NULL,
    "academicYear" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "ClassEnrollment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tier" ADD CONSTRAINT "Tier_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassEnrollment" ADD CONSTRAINT "ClassEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassEnrollment" ADD CONSTRAINT "ClassEnrollment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassEnrollment" ADD CONSTRAINT "ClassEnrollment_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_tierId_fkey" FOREIGN KEY ("tierId") REFERENCES "Tier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

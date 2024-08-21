/*
  Warnings:

  - You are about to drop the column `class` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `class` to the `Remarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Remarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Remarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classLevel` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Remarks" ADD COLUMN     "class" "Class" NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "term" "Term" NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "class",
DROP COLUMN "term",
ADD COLUMN     "classLevel" "ClassLevel" NOT NULL;

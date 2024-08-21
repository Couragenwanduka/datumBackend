/*
  Warnings:

  - You are about to drop the column `classLevel` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `class` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "classLevel",
ADD COLUMN     "class" "Class" NOT NULL,
ADD COLUMN     "term" "Term" NOT NULL;

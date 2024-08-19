/*
  Warnings:

  - You are about to drop the column `date` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Activities` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

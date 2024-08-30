/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ClassTable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClassTable_name_key" ON "ClassTable"("name");

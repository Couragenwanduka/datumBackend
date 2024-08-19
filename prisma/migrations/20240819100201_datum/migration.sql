-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "class" TEXT NOT NULL DEFAULT 'DefaultClass',
ADD COLUMN     "classTier" "ClassDivision" NOT NULL DEFAULT 'Purity',
ADD COLUMN     "teacherId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Present', 'Absent', 'Late');

-- CreateEnum
CREATE TYPE "Term" AS ENUM ('FirstTerm', 'SecondTerm', 'ThirdTerm');

-- CreateEnum
CREATE TYPE "ClassDivision" AS ENUM ('Purity', 'Peace', 'Love', 'Wisdom', 'Joy');

-- CreateEnum
CREATE TYPE "Class" AS ENUM ('Jss1', 'Jss2', 'Jss3', 'Sss1', 'Sss2', 'Sss3');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('Active', 'Transferred', 'Expelled', 'Graduated', 'Other');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Teacher');

-- CreateEnum
CREATE TYPE "ClassLevel" AS ENUM ('JuniorSecondarySchool', 'SeniorSecondarySchool');

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "surName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "otherName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "surName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "otherName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "nationality" TEXT NOT NULL,
    "stateOfOrigin" TEXT NOT NULL,
    "localGovernment" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "class" "Class" NOT NULL,
    "classTier" "ClassDivision" NOT NULL,
    "term" "Term" NOT NULL,
    "picture" TEXT NOT NULL,
    "previousSchool" TEXT NOT NULL,
    "parentEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StudentStatus" NOT NULL DEFAULT 'Active',
    "statusReason" TEXT,
    "statusChangeDate" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "surName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "otherName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "stateOfOrign" TEXT NOT NULL,
    "localGovernment" TEXT NOT NULL,
    "employmentRole" TEXT NOT NULL,
    "employmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qualification" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Teacher',
    "gradeLevel" TEXT NOT NULL DEFAULT 'levelOne',
    "step" TEXT NOT NULL DEFAULT 'stepOne',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "surName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "otherName" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "test" TEXT NOT NULL,
    "assignment" TEXT NOT NULL,
    "midTermTest" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "average" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dayOfWeek" TEXT NOT NULL DEFAULT 'Monday',
    "time" TEXT NOT NULL DEFAULT '00:00',
    "teacherId" INTEGER NOT NULL DEFAULT 1,
    "class" TEXT NOT NULL DEFAULT 'DefaultClass',
    "classTier" "ClassDivision" NOT NULL DEFAULT 'Purity',
    "status" "Status" NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

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
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remarks" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "remark" TEXT NOT NULL,
    "class" "Class" NOT NULL,
    "term" "Term" NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Remarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "classLevel" "ClassLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_phoneNumber_key" ON "Parent"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_email_key" ON "Administrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_phoneNumber_key" ON "Administrator"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentEmail_fkey" FOREIGN KEY ("parentEmail") REFERENCES "Parent"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "SchemeOfWork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

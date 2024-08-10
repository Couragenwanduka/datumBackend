-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "relationship" TEXT,
    "contactNumber" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "nationality" TEXT,
    "currentAddress" TEXT,
    "permanentAddress" TEXT,
    "enrollmentDate" TIMESTAMP(3) NOT NULL,
    "gradeLevel" TEXT,
    "classSection" TEXT,
    "photo" TEXT,
    "parentEmail" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);



-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentEmail_fkey" FOREIGN KEY ("parentEmail") REFERENCES "Parent"("email") ON DELETE SET NULL ON UPDATE CASCADE;

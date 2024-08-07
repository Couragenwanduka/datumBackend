-- Create Parent Table
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "relationship" TEXT,
    "contactNumber" TEXT,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- Create Student Table
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,  -- Changed to DATE for proper date handling
    "gender" TEXT,
    "nationality" TEXT,
    "currentAddress" TEXT,
    "permanentAddress" TEXT,
    "enrollmentDate" DATE NOT NULL,  -- Changed to DATE for proper date handling
    "gradeLevel" TEXT,
    "classSection" TEXT,
    "photo" TEXT,
    "parentEmail" TEXT,  -- Added to link to Parent by email

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id"),

    -- Foreign Key Constraint
    CONSTRAINT "Student_parentEmail_fkey" FOREIGN KEY ("parentEmail") REFERENCES "Parent"("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create Index on Parent Email
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Date of birth must be in the past"
        }
    },
    gender:{
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    nationality:{
        type: String,
        required: true
    },
    currentAddress:{
        type: String,
        required: true
    },
    permanentAddress:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    enrollment_date: {
        type: Date,
        required: true
    },
    grade_level: {
        type: String,
        required: true
    },
    class_section: {
        type: String,
        required: true
    }
}); 

const Student = mongoose.model("Student", studentSchema);

export default Student;
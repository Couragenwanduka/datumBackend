import mongoose from "mongoose";

const parentGuardianSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    }
})

const ParentGuardian = mongoose.model("ParentGuardian", parentGuardianSchema);

export default ParentGuardian;
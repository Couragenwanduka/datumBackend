import mongoose from "mongoose";

const parentGuardianSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    studentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }]
})

const ParentGuardian = mongoose.model("ParentGuardian", parentGuardianSchema);

export default ParentGuardian;
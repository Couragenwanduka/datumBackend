import mongoose from "mongoose";

const feedback = new mongoose.Schema({
    studentId:{
        type: Number,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    term:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    }
})

const Feedback = mongoose.model("Feedback", feedback);

export default Feedback;
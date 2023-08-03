import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    parentsName: {
      type: String,
      required: true,
    },
    address: { type: String, required: true },
    details: { type: String },
    joiningInfo: {
      interviewDate: { type: Date },
      guardianName: { type: String },
      relationWithGuardian: { type: String },
      interviewer: { type: String },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);

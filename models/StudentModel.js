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
      maxlength: 64,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 45,
    },
    dob: {
      type: Date,
      required: true,
    },
    studentClass: {
      type: String,
      required: true,
      maxlength: 45,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    parentsName: {
      type: String,
      required: true,
      maxlength: 54,
    },
    address: {
      type: String,
      required: true,
      maxlength: 54,
    },
    details: {
      type: String,
      maxlength: 54,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customFields: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);

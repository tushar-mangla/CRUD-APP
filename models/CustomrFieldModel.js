import mongoose from "mongoose";

const customFieldSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "input", "checkbox", "dropdown", "radio"],
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("CustomField", customFieldSchema);

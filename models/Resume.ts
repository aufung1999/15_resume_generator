import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    HTMLDIVElement: { type: String, required: true },
    Job_Details: { type: String, required: false },
  },
  { timestamps: true }
);

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;

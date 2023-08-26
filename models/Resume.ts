import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    HTMLDIVElement: { type: String, required: true },
    Stage_3: { type: String, required: false },
    Matches: { type: String, required: false },
    Unmatches: { type: String, required: false },
    Job_Details: { type: String, required: false },
    Response: { type: String, required: false },
    Work: { type: Array, required: false },
    Project: { type: Array, required: false },
    Skill: { type: Array, required: false },

  },
  { timestamps: true }
);

const Resume = mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export default Resume;

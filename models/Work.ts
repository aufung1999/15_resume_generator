import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    index: { type: String, required: true },
    CompanyName: { type: String, required: true },
    Position: { type: String, required: true },
    current: { type: Boolean, required: false },
    StartDate: { type: String, required: true },
    EndDate: { type: String, required: false },
    JobDescription: { type: Array, required: false },
  },
  { timestamps: true }
);

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);
export default Work;

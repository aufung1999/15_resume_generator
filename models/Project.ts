import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    index: { type: String, required: true },
    ProjectName: { type: String, required: true },
    Techniques: { type: String, required: true },
    ProjectDescription: { type: Array, required: false },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;

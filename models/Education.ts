import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    index: { type: String, required: true },
    SchoolName: { type: String, required: true },
    Degree: { type: String, required: true },
    Subject: { type: String, required: true },
    current: { type: Boolean, required: false },
    StartDate: { type: String, required: true },
    EndDate: { type: String, required: false },
  },
  {
    timestamps: true,
    // strict:false
  }
);

const Education =
  mongoose.models.Education || mongoose.model("Education", educationSchema);
export default Education;

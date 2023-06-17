import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    index: { type: String, required: true },
    term: { type: String, required: true },
    skill: { type: Array, required: false },
  },
  { timestamps: true }
);

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);
export default Skill;

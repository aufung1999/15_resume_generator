import mongoose from "mongoose";

const objectiveSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    index: { type: String, required: true },
    ObjectiveDes: { type: String, required: true },
  },
  {
    timestamps: true,
    // strict:false
  }
);

const Objective =
  mongoose.models.Objective || mongoose.model("Objective", objectiveSchema);
export default Objective;

import mongoose from "mongoose";

const awardSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    index: { type: String, required: true },
    AwardName: { type: String, required: true },
    AwardBy: { type: String, required: true },
    Date: { type: String, required: true },
    AwardDescription: { type: String, required: true },
  },
  {
    timestamps: true,
    // strict:false
  }
);

const Award =
  mongoose.models.Award || mongoose.model("Award", awardSchema);
export default Award;

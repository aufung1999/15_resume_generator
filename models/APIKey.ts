import mongoose from "mongoose";

const apikeySchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    api_key: { type: String, required: true },

  }
);

const APIKey =
  mongoose.models.APIKey || mongoose.model("APIKey", apikeySchema);
export default APIKey;

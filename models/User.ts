import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
    address: { type: String, required: false },
    contact: { type: String, required: false },
  },
  {
    timestamps: true,
    // strict:false
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

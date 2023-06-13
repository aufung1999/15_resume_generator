import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    FirstName: { type: String, required: false },
    LastName: { type: String, required: false },
    PhoneNumber: { type: String, required: false },
    Country: { type: String, required: false },
    City: { type: String, required: false },
    State: { type: String, required: false },
    ZipCode: { type: String, required: false },
    Email: { type: String, required: false },
    Portfolio: { type: String, required: false },
    LinkedIn: { type: String, required: false },
  },
  {
    timestamps: true,
    // strict:false
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;

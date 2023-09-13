import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Mark the email field as unique
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Admin", adminSchema);

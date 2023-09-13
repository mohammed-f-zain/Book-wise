import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sign Up an Admin
export const signUpAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // Use an appropriate salt rounds value (e.g., 10)

    const admin = new Admin({ email, password: hashedPassword });

    // Save the admin in the database
    await admin.save();

    // Generate a JWT token for the admin
    const token = jwt.sign({ adminId: admin._id }, process.env.ADMIN_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Admin created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Sign In an Admin
export const signInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token for the signed-in admin
    const token = jwt.sign({ adminId: admin._id }, process.env.ADMIN_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

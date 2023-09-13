import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js"; // Import your admin model

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET); // Replace with your admin JWT secret key

    // Find the admin based on the decoded token
    const admin = await Admin.findOne({ _id: decoded.adminId });

    if (!admin) {
      throw new Error();
    }

    req.admin = admin; // Attach the admin object to the request
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: "Admin authentication failed" });
  }
};

import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Import your user model

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET); 

    // Find the user based on the decoded token
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user; // Attach the user object to the request
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

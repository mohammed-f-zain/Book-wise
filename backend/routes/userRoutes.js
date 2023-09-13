import express from "express";
import {
  register,
  login,
  addCommentToBook,
  addToReadWishlist,
  addToReadingWishlist,
  addToToReadWishlist,
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
  addUserRatingToBook
} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// Get user profile route
router.get("/profile/:id", getUserProfile);

// Update user profile route
router.patch("/profile/:id", updateUserProfile);

// Delete user account route
router.delete("/profile/:id",adminAuthMiddleware, deleteUserAccount);

// Add a book to "Read" wishlist
router.post("/wishlist/read/:bookId", authMiddleware,addToReadWishlist);

// Add a book to "To Read" wishlist
router.post("/wishlist/to-read/:bookId",authMiddleware, addToToReadWishlist);

// Add a book to "Reading" wishlist
router.post("/wishlist/reading/:bookId",authMiddleware, addToReadingWishlist);

// Add a comment to a book
router.post("/comment/:bookId",authMiddleware, addCommentToBook);
// Add a user rating to a book (protected route)
router.post("/rate/:id", authMiddleware, addUserRatingToBook);

export default router;

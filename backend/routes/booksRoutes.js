import express from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  getBooksByCategory,
  updateBookById,
} from "../controllers/booksController.js";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Create a new book (protected route)
router.post("/create", adminAuthMiddleware,createBook);

// Get a list of all books
router.get("/list", getAllBooks);

// Get book details by ID
router.get("/:id", getBookById);

// Update book details by ID (protected route)
router.patch("/:id",adminAuthMiddleware, updateBookById);

// Delete a book by ID (protected route)
router.delete("/:id",adminAuthMiddleware, deleteBookById);

// Get Books By Category
router.get("/category/:category", getBooksByCategory);

export default router;

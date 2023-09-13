import Book from "../models/booksModel.js";
import User from "../models/userModel.js";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { name, description, details, image, category, author } = req.body;

    // Check if a book with the same name already exists
    const existingBook = await Book.findOne({ name });

    if (existingBook) {
      return res
        .status(400)
        .json({ message: "A book with the same name already exists" });
    }

    const book = new Book({
      name,
      description,
      details,
      image,
      category,
      author,
    });

    await book.save();
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a list of all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get book details by ID
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update book details by ID
export const updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updates = req.body;
    const { name } = updates; // Extract the updated book name

    // Check if a book with the same name already exists (excluding the current book being updated)
    const existingBook = await Book.findOne({ name, _id: { $ne: bookId } });

    if (existingBook) {
      return res
        .status(400)
        .json({ message: "A book with the updated name already exists" });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a book by ID
export const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get books by category
export const getBooksByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const books = await Book.find({ category });

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

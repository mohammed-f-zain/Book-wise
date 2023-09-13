import User from "../models/userModel.js";
import Book from "../models/booksModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, country } = req.body;

    // Input validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
      country,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive information like the password
    const userProfile = {
      name: user.name,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      country: user.country,
      wishList: user.wishList,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Validate the updates here (e.g., ensure only allowed fields are modified)

    // Check if the user making the request has permission to update the profile (e.g., user authentication and authorization)

    // Sanitize the input data if necessary

    // Check if the updates include a new password and hash it if it's present
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10); // Hash the new password
      updates.password = hashedPassword; // Update the password field with the hashed password
    }

    // Update the user profile
    const updatedUserProfile = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUserProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUserProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user account
export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Implement the deletion logic here
    // You may want to perform additional cleanup, such as deleting associated data or revoking tokens

    // Delete the user account
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a book to "Read" wishlist
export const addToReadWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;

    const bookExists = await Book.findById(bookId);

    if (!bookExists) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the book from other wishlists
    user.wishList.toRead = user.wishList.toRead.filter(
      (id) => id.toString() !== bookId.toString()
    );
    user.wishList.reading = user.wishList.reading.filter(
      (id) => id.toString() !== bookId.toString()
    );

    // Add the book to the "Read" wishlist
    user.wishList.read.push(bookId);

    await user.save();

    res.status(200).json({ message: 'Book added to "Read" wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a book to "To Read" wishlist
export const addToToReadWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;

    const bookExists = await Book.findById(bookId);

    if (!bookExists) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the book from other wishlists
    user.wishList.read = user.wishList.read.filter(
      (id) => id.toString() !== bookId.toString()
    );
    user.wishList.reading = user.wishList.reading.filter(
      (id) => id.toString() !== bookId.toString()
    );

    // Add the book to the "To Read" wishlist
    user.wishList.toRead.push(bookId);

    await user.save();

    res.status(200).json({ message: 'Book added to "To Read" wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a book to "Reading" wishlist
export const addToReadingWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.bookId;

    const bookExists = await Book.findById(bookId);

    if (!bookExists) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the book from other wishlists
    user.wishList.read = user.wishList.read.filter(
      (id) => id.toString() !== bookId.toString()
    );
    user.wishList.toRead = user.wishList.toRead.filter(
      (id) => id.toString() !== bookId.toString()
    );

    // Add the book to the "Reading" wishlist
    user.wishList.reading.push(bookId);

    await user.save();

    res.status(200).json({ message: 'Book added to "Reading" wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Add a comment to a book
export const addCommentToBook = async (req, res) => {
  try {
    const bookId = req.params.bookId; // Corrected parameter name to "bookId"
    const { text } = req.body;

    const user = req.user; // Assuming you have user information in the request (e.g., authentication)

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create a comment object
    const comment = {
      user: user._id, // You can replace this with the user's ID
      text,
    };

    book.comments.push(comment);
    await book.save();

    res.status(201).json({ message: "Comment added to the book" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a user rating to a book
export const addUserRatingToBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { rating } = req.body;

    const user = req.user; // Assuming you have user information in the request (e.g., authentication)

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user has already rated the book
    const existingRating = book.userRatings.find((r) =>
      r.user.equals(user._id)
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Create a new rating object
      const userRating = {
        user: user._id, // You can replace this with the user's ID
        rating,
      };

      book.userRatings.push(userRating);
    }

    // Recalculate the average rating for the book
    const totalRatings = book.userRatings.reduce((sum, r) => sum + r.rating, 0);
    book.rate = totalRatings / book.userRatings.length;

    await book.save();

    res.status(201).json({ message: "User rating added to the book" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


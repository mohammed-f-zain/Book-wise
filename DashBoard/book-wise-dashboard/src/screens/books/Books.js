import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import "./books.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteBookModal from "./DeleteBookModal";
import EditBookModal from "./EditBookModal";
import AddNewBookModal from "./AddBookModal";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBookData, setSelectedBookData] = useState(null);
  const [showAddNewModal, setShowAddNewModal] = useState(false); // Declare and define showAddNewModal

  useEffect(() => {
    // Fetch the data when the component mounts
    axios
      .get("https://book-wise-5tjm.onrender.com/books/list")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [books]);

  // Function to handle editing a book
  const handleEdit = (book) => {
    setSelectedBookData(book);
    setShowEditModal(true);
  };

  // Function to handle adding a new book
  const handleAddNew = () => {
    setShowAddNewModal(true);
  };

  // Function to open the delete confirmation modal
  const handleShowDeleteModal = (bookId) => {
    setSelectedBookId(bookId);
    setShowDeleteModal(true);
  };

  // Function to close the delete confirmation modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Function to delete a book and update the book list
  const handleDelete = (bookId) => {
    axios
      .delete(`https://book-wise-5tjm.onrender.com/books/${bookId}`)
      .then(() => {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
        handleCloseDeleteModal(); // Close the modal after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <>
      <NavBar />
      <div className="row books">
        <div className="col-12">
          <div className="container">
            <div className="btns">
              <h1>Book List</h1>
              <button
                className="btn btn-success mb-2 addBtn"
                onClick={handleAddNew}
              >
                Add New Book +
              </button>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>_id</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Description</th>
                  <th>Details</th>
                  <th>Category</th>
                  <th>Rate</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>{book._id}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.description}</td>
                    <td>{book.details}</td>
                    <td>{book.category}</td>
                    <td>{book.rate}</td>
                    <td>
                      <img
                        src={book.image}
                        alt={book.name}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleShowDeleteModal(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <DeleteBookModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        bookId={selectedBookId}
        onDelete={handleDelete}
      />
      <EditBookModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        bookData={selectedBookData}
        onUpdate={(updatedData) => {
          // Update the books list with the edited data
          setBooks((prevBooks) =>
            prevBooks.map((book) =>
              book._id === updatedData._id ? updatedData : book
            )
          );
        }}
      />
      <AddNewBookModal
        show={showAddNewModal}
        handleClose={() => setShowAddNewModal(false)}
        onAdd={(newBook) => {
          // Handle the addition of the new book here
          setBooks((prevBooks) => [...prevBooks, newBook]);
        }}
      />
    </>
  );
};

export default Books;

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DeleteBookModal = ({ show, handleClose, bookId, onDelete }) => {
  const handleDelete = () => {
    const token = localStorage.getItem("token"); // Replace with your actual token key

    if (!token) {
      // Handle the case where the token is not found in local storage
      console.error("Authentication token not found in local storage");
      return;
    }

    // Include the token in the request headers
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .delete(`https://book-wise-5tjm.onrender.com/books/${bookId}`, {
        headers: headers,
      })
      .then(() => {
        onDelete(bookId); // Notify the parent component that the book was deleted
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBookModal;

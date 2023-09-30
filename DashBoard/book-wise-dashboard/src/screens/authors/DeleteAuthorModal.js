import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DeleteAuthorModal = ({ show, handleClose, authorId, onDelete }) => {
  const handleDelete = () => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    axios
      .delete(`https://book-wise-5tjm.onrender.com/author/${authorId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      })
      .then(() => {
        onDelete(); // Notify the parent component that the author was deleted
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error deleting author:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this author?</Modal.Body>
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

export default DeleteAuthorModal;

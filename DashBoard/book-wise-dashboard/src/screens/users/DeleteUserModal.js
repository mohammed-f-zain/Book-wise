import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const DeleteUserModal = ({ show, handleClose, userId, onDelete }) => {
  const handleDelete = () => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    axios
      .delete(`https://book-wise-5tjm.onrender.com/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      })
      .then(() => {
        onDelete(userId); // Notify the parent component that the user was deleted
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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

export default DeleteUserModal;

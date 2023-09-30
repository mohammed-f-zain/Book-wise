import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./books.css";

const EditBookModal = ({ show, handleClose, bookData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({ ...bookData });

  const handleUpdate = () => {
    const token = localStorage.getItem("token"); // Replace with your actual token key

    if (!token) {
      // Handle the case where the token is not found in local storage
      console.error("Authentication token not found in local storage");
      return;
    }

    // Send the updated data to the server
    axios
      .patch(
        `https://book-wise-5tjm.onrender.com/books/${bookData._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        onUpdate(updatedData); // Notify the parent component that the book was updated
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={updatedData.author}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={updatedData.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Details:</label>
            <textarea
              name="details"
              value={updatedData.details}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={updatedData.category}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={updatedData.image}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;

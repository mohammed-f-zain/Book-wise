import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./books.css";
import FileBase from "react-file-base64";

const categories = [
  "Comedy",
  "Thriller",
  "Romance",
  "Biography",
  "Historical",
  "Motivation",
  "Kids",
  // Add more categories as needed
];

const EditBookModal = ({ show, handleClose, bookData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({ ...bookData });

  // Update the local state when bookData prop changes
  useEffect(() => {
    setUpdatedData({ ...bookData });
  }, [bookData]);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found in local storage");
      return;
    }

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
        onUpdate(updatedData);
        handleClose();
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
            <select
              name="category"
              value={updatedData.category}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
          <label>Image:</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                handleInputChange({ target: { name: "image", value: base64 } })
              }
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

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
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

const AddNewBookModal = ({ show, handleClose, onAdd }) => {
  const [newBookData, setNewBookData] = useState({
    name: "",
    author: "",
    description: "",
    details: "",
    category: "", // Initialize category as an empty string
    image: "",
  });

  const handleAdd = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found in local storage");
      return;
    }

    axios
      .post("https://book-wise-5tjm.onrender.com/books/create", newBookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        onAdd(response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding new book:", error);
      });
      setNewBookData({})
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newBookData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={newBookData.author}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={newBookData.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Details:</label>
            <textarea
              name="details"
              value={newBookData.details}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={newBookData.category}
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
        <Button variant="primary" onClick={handleAdd}>
          Add Book
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewBookModal;

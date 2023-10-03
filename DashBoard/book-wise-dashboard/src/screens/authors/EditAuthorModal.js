import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./author.css";
import FileBase from "react-file-base64";

const EditAuthorModal = ({ show, handleClose, authorData, onUpdate }) => {
  const [updatedAuthor, setUpdatedAuthor] = useState({ ...authorData });

  // Update the local state when authorData prop changes
  useEffect(() => {
    setUpdatedAuthor({ ...authorData });
  }, [authorData]);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found in local storage");
      return;
    }

    axios
      .patch(
        `https://book-wise-5tjm.onrender.com/author/${authorData._id}`,
        updatedAuthor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        onUpdate(updatedAuthor);
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating author:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedAuthor.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={updatedAuthor.age}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={updatedAuthor.country}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Writing Type:</label>
            <input
              type="text"
              name="writingType"
              value={updatedAuthor.writingType}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Life and Career:</label>
            <textarea
              name="lifeAndCareer"
              value={updatedAuthor.lifeAndCareer}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image :</label>
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

export default EditAuthorModal;

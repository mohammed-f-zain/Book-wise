import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const EditAuthorModal = ({ show, handleClose, authorData, onUpdate }) => {
  const [updatedAuthor, setUpdatedAuthor] = useState(authorData || {});

  const handleUpdate = () => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    axios
      .patch(
        `https://book-wise-5tjm.onrender.com/author/${authorData._id}`,
        updatedAuthor,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      )
      .then(() => {
        onUpdate(updatedAuthor); // Notify the parent component that the author was updated
        handleClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating author:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {updatedAuthor && (
          <>
            {/* Create form fields for editing author data */}
            <input
              type="text"
              value={updatedAuthor.name || ""}
              onChange={(e) =>
                setUpdatedAuthor({ ...updatedAuthor, name: e.target.value })
              }
              placeholder="Author Name"
            />
            <input
              type="text"
              value={updatedAuthor.age || ""}
              onChange={(e) =>
                setUpdatedAuthor({ ...updatedAuthor, age: e.target.value })
              }
              placeholder="Age"
            />
            <input
              type="text"
              value={updatedAuthor.country || ""}
              onChange={(e) =>
                setUpdatedAuthor({ ...updatedAuthor, country: e.target.value })
              }
              placeholder="Country"
            />
            <input
              type="text"
              value={updatedAuthor.writingType || ""}
              onChange={(e) =>
                setUpdatedAuthor({
                  ...updatedAuthor,
                  writingType: e.target.value,
                })
              }
              placeholder="Writing Type"
            />
            <input
              type="text"
              value={updatedAuthor.lifeAndCareer || ""}
              onChange={(e) =>
                setUpdatedAuthor({
                  ...updatedAuthor,
                  lifeAndCareer: e.target.value,
                })
              }
              placeholder="Life and Career"
            />
            <input
              type="text"
              value={updatedAuthor.image || ""}
              onChange={(e) =>
                setUpdatedAuthor({ ...updatedAuthor, image: e.target.value })
              }
              placeholder="Image URL"
            />
            {/* Add more fields for other author data */}
          </>
        )}
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

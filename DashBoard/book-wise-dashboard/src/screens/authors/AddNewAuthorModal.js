import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./author.css";
import FileBase from "react-file-base64";

const AddNewAuthorModal = ({ show, handleClose, onAdd }) => {
  const [newAuthorData, setNewAuthorData] = useState({
    name: "",
    image: "",
    age: "",
    country: "",
    lifeAndCareer: "",
    writingType: "",
  });

  const handleAdd = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found in local storage");
      return;
    }

    axios
      .post(
        "https://book-wise-5tjm.onrender.com/author/create",
        newAuthorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        onAdd(response.data);
        handleClose();
        setNewAuthorData({});
      })
      .catch((error) => {
        console.error("Error adding new author:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAuthorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newAuthorData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={newAuthorData.age}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={newAuthorData.country}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Writing Type:</label>
            <input
              type="text"
              name="writingType"
              value={newAuthorData.writingType}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Life and Career:</label>
            <textarea
              name="lifeAndCareer"
              value={newAuthorData.lifeAndCareer}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          {/* <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={newAuthorData.image}
              onChange={handleInputChange}
              className="form-control"
            />
          </div> */}
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
        <Button variant="primary" onClick={handleAdd}>
          Add Author
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewAuthorModal;

import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./author.css";
import AddNewAuthorModal from "./AddNewAuthorModal";
import DeleteAuthorModal from "./DeleteAuthorModal";
import EditAuthorModal from "./EditAuthorModal";
const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAuthorData, setSelectedAuthorData] = useState(null);
  const [showAddNewModal, setShowAddNewModal] = useState(false);

  useEffect(() => {
    // Fetch the author data when the component mounts
    axios
      .get("https://book-wise-5tjm.onrender.com/author/list")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
      });
  }, [authors]);

  // Function to handle editing an author
  const handleEditAuthor = (author) => {
    setSelectedAuthorData(author);
    setShowEditModal(true);
  };

  // Function to handle deleting an author
  const handleDeleteAuthor = (authorId) => {
    setSelectedAuthorId(authorId);
    setShowDeleteModal(true);
  };

  // Function to handle adding a new author
  const handleAddNewAuthor = () => {
    setShowAddNewModal(true);
  };

  // Rest of your code...

  return (
    <>
      <NavBar />
      <div className="row authors">
        <div className="col-12">
          <div className="container">
            <div className="btns">
              <h1>Author List </h1>
              <button
                className="btn btn-success mb-2 addBtn"
                onClick={handleAddNewAuthor}
              >
                Add New Author +
              </button>
            </div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>_id</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Age</th>
                  <th>Country</th>
                  <th>Writing Type</th>
                  <th>Life and Career</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author) => (
                  <tr key={author._id}>
                    <td>{author._id}</td>
                    <td>{author.name}</td>
                    <td>
                      <img
                        src={author.image}
                        alt={author.name}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{author.age}</td>
                    <td>{author.country}</td>
                    <td>{author.writingType}</td>
                    <td>{author.lifeAndCareer}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditAuthor(author)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteAuthor(author._id)}
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
      {/* Include modal components here */}
      <EditAuthorModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        authorData={selectedAuthorData}
        onUpdate={(updatedAuthor) => {
          // Handle the update of the author here
          setAuthors((prevAuthors) =>
            prevAuthors.map((author) =>
              author._id === updatedAuthor._id ? updatedAuthor : author
            )
          );
        }}
      />
      <DeleteAuthorModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        authorId={selectedAuthorId}
        onDelete={() => {
          // Handle the deletion of the author here
          setAuthors((prevAuthors) =>
            prevAuthors.filter((author) => author._id !== selectedAuthorId)
          );
        }}
      />
      <AddNewAuthorModal
        show={showAddNewModal}
        handleClose={() => setShowAddNewModal(false)}
        onAdd={(newAuthor) => {
          // Handle the addition of the new author here
          setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
        }}
      />
    </>
  );
};

export default Authors;

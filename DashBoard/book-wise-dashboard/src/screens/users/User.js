import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./user.css";
import DeleteUserModal from "./DeleteUserModal"; // Import the DeleteUserModal component

function User() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    // Fetch user data when the component mounts
    axios
      .get("https://book-wise-5tjm.onrender.com/user/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [users]);

  // Function to show the delete user modal
  const showDeleteUserModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  // Function to hide the delete user modal
  const hideDeleteUserModal = () => {
    setSelectedUserId(null);
    setShowDeleteModal(false);
  };

  // Function to handle deleting a user (placeholder)
  const handleDelete = (userId) => {
    // Implement your delete logic here
    console.log("Delete user with ID:", userId);
  };

  // Function to handle editing a user (placeholder)
  const handleEdit = (user) => {
    // Implement your edit logic here
    console.log("Edit user:", user);
  };

  // Function to handle user deletion and update the user list
  const onDeleteUser = (deletedUserId) => {
    // Filter the users array to remove the deleted user
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== deletedUserId)
    );
  };

  return (
    <>
      <NavBar />
      <div className="row users">
        <div className="col-12">
          <div className="container">
            <h1 style={{ color: "white" }}>User List</h1>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Date of Birth</th>
                  <th>Country</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.dateOfBirth}</td>
                    <td>{user.country}</td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => showDeleteUserModal(user._id)}
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
      {/* Render the DeleteUserModal component */}
      <DeleteUserModal
        show={showDeleteModal}
        handleClose={hideDeleteUserModal}
        userId={selectedUserId}
        onDelete={onDeleteUser}
      />
    </>
  );
}

export default User;

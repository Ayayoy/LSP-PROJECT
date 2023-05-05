import React, { useState, useEffect } from "react";
import "./RegistrationReq.css";
import AdminHeader from "../AdminHeader/AdminHeader";

const RegistrationReq = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/books/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.user));
  }, []);

  const handleApprove = (id) => {
    fetch(`http://localhost:4000/books/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.ms);
        // Refresh the user list
        fetch("http://localhost:4000/books/users")
          .then((response) => response.json())
          .then((data) => setUsers(data.user));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReject = (id) => {
    fetch(`http://localhost:4000/books/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Refresh the user list
        fetch("http://localhost:4000/books/users")
          .then((response) => response.json())
          .then((data) => setUsers(data.user));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <AdminHeader />
      <div className="card-stack">
        {users.map((user) => (
          <div key={user.id} className="card2">
            <h2 className="reqp">{user.name}</h2>
            <p className="reqp">{user.email}</p>
            <div className="buttons3">
              <button
                className="approve"
                onClick={() => handleApprove(user.id)}
              >
                Approve
              </button>
              <button
                className="reject"
                onClick={() => handleReject(user.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationReq;

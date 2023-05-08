import React, { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import "./BorrowingReq.css";



export default function BorrowingReq() {
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/Books/borrow")
      .then((response) => response.json())
      .then((data) => setBorrowRequests(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAccept = (id) => {
    
    if (!returnDate) {
      alert("Please choose a return date");
      return;
    }
    fetch(`http://localhost:4000/Books/borrow/${id}/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ returnDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // update the borrowRequests state accordingly
        setBorrowRequests(borrowRequests.filter((request) => request.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleDeny = (id) => {
    fetch(`http://localhost:4000/Books/borrow/${id}/reject`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // update the borrowRequests state accordingly
        setBorrowRequests(borrowRequests.filter((request) => request.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleReturnDateChange = (e) => {
    setReturnDate(e.target.value);
  };

  return (
      <div className="borrowing-container">
      <AdminHeader />
      <div className=".borrowing-req-container">
        {borrowRequests.length > 0 ? (
          borrowRequests.map((request) => (
            <div className="card2" key={request.id}>
              <p className="request-info">
                <b>Borrower's name: {request.name}</b>
              </p>
              <p className="request-info">
                <b>Email: {request.email}</b>
              </p>
              <p className="request-info">
                <b>required book: {request.title}</b>
              </p>
              <label className="request-info">
                <b>Return Date:</b>
              </label>
              <input type="date" onChange={handleReturnDateChange} className="return-date-input" required/>
              <div className="buttons3">
                <button className="approve" onClick={() => handleAccept(request.id)}>
                  Accept
                </button>
                <button className="reject" onClick={() => handleDeny(request.id)}>
                  Deny
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="nonMessage">No requests</p>
        )}
      </div>
    </div>

    
  );
}

import React, { useState } from "react";
import "./AdminDashboard.css";
import AdminHeader from "../AdminHeader/AdminHeader";
import BookCard from "../book_card/BookCard";


function AdminDashboard() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [subject, setSubject] = useState("");
  const [rackNumber, setRackNumber] = useState("");
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // validate ISBN field
    if (isbn.length < 13) {
      alert("ISBN should be at least 13 characters");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isbn", isbn);
    formData.append("subject", subject);
    formData.append("rack_number", rackNumber);
    formData.append("image", image);
  
    fetch("http://localhost:4000/Books/create", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Do something with the response data if needed
      setSuccessMessage("The book has been created");
      setTitle(""); setAuthor(""); setIsbn(""); setSubject(""); setRackNumber(""); setImage(""); 
    })
    .catch((error) => {
      console.error(error);
    });
  };
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddBook = () => {
    setShowForm(true);
  };



  return (
    <div>
      <AdminHeader />
      <div className="admin-dashboard-container">
        <button className="add-book-button" onClick={handleAddBook}>
          Add Book
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="addform">
            {successMessage && (
            <div className="creation-message">{successMessage}</div>
          )}
            <div className="form-group">
              <label className="labels" htmlFor="title">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="labels" htmlFor="author">
                Author:
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="labels" htmlFor="imageUpload">
                Upload Image:
              </label>
              <input
                type="file"
                className="form-control-file"
                id="imageUpload"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label className="labels" htmlFor="isbn">
                ISBN:
              </label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="labels" htmlFor="rackNumber">
                Rack Number:
              </label>
              <input
                type="text"
                className="form-control"
                id="rackNumber"
                value={rackNumber}
                onChange={(e) => setRackNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="labels" htmlFor="subject">
                Subject:
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Create Book
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        )}
        <BookCard />
      </div>
    </div>
  );
}

export default AdminDashboard;

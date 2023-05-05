import React, { useState, useEffect } from "react";
import axios from "axios";

const BookCard = () => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/Books") // fix endpoint name to match backend
      .then((resp) => {
        setBooks(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/Books/${id}`) // fix endpoint name to match backend
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        setEditingBookId(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditButtonClick = (id) => {
    setEditingBookId(id);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const id = form.elements.id.value;

    const formData = new FormData();
    formData.append("title", form.elements.title.value);
    formData.append("author", form.elements.author.value);
    formData.append("subject", form.elements.subject.value);
    formData.append("isbn", form.elements.isbn.value);
    formData.append("rack_number", form.elements.rack_number.value);
    formData.append("image", selectedFile);

    axios
      .put(`http://localhost:4000/Books/${id}`, formData)
      .then((resp) => {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === id ? resp.data : book))
        );
        setEditingBookId(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSortByisbn = () => {
    const sortedBooks = [...books].sort((a, b) => a.isbn - b.isbn);
    setBooks(sortedBooks);
    fetch("http://localhost:4000/Books/filter")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response data
      })
      .catch((error) => console.error(error));
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]); // Save the selected file to the state
  };

  const handleCancelButtonClick = () => {
    setEditingBookId(null);
  };

  return (
    <div className="book-list">
      <button onClick={handleSortByisbn} className="filter">
        Filter
      </button>
      {editingBookId !== null ? (
        <div key={editingBookId} className="editCard">
          <form onSubmit={handleFormSubmit} className="formm">
            <label className="labels">
              Image:
              <input
                type="file"
                name="image_url"
                className="form-control"
                onChange={handleFileInputChange}
              />
            </label>
            <label className="labels">
              Title:
              <input
                type="title"
                name="title"
                className="form-control"
                defaultValue={
                  books.find((book) => book.id === editingBookId).title
                }
              />
            </label>
            <label className="labels">
              Author:
              <input
                name="author"
                className="form-control"
                defaultValue={
                  books.find((book) => book.id === editingBookId).author
                }
              />
            </label>
            <label className="labels">
              subject:
              <input
                name="subject"
                className="form-control"
                defaultValue={
                  books.find((book) => book.id === editingBookId).subject
                }
              />
            </label>
            <label className="labels">
              ISBN:
              <input
                name="isbn"
                className="form-control"
                defaultValue={
                  books.find((book) => book.id === editingBookId).isbn
                }
              />
            </label>

            <label className="labels">
              Rack Number:
              <input
                type="text"
                name="rack_number"
                className="form-control"
                defaultValue={
                  books.find((book) => book.id === editingBookId).rack_number
                }
              />
            </label>

            <input type="hidden" name="id" value={editingBookId} />
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={handleCancelButtonClick}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="card-list">
          {!books || books.length === 0 ? (
            <p className="err-msg">No books found.</p>
          ) : (
            <>
              {books.map((book) => (
                <div key={book.id} className="card">
                  <img src={book.image_url} alt={book.title} />
                  <div className="card-content">
                    <h2>{book.title}</h2>
                    <p>By {book.author}</p>
                    <p>Subject: {book.subject}</p>
                    <p>ISBN: {book.isbn}</p>
                    <p>Rack number: {book.rack_number}</p>
                    <div className="button-group">
                      <button
                        className="edit"
                        onClick={() => handleEditButtonClick(book.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete ${book.title}?`
                            )
                          ) {
                            handleDelete(book.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;

import React, { useState, useEffect } from "react";
import HeaderUser from "../header/HeaderUser";

function BorrowedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    fetch(`http://localhost:4000/Books/borrowedBooks/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="book-list">
      <HeaderUser />
      <main>
        <div className="card-list">
          {books.map((book) => (
            <div className="card" key={book.id}>
              <img src={book.image_url} alt={book.title} />
              <div className="card-content">
                <h2>Title: {book.title}</h2>
                <p>By {book.author}</p>
                <p>Category: {book.category}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Rack Number: {book.rack_number}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default BorrowedBooks;

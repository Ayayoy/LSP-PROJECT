import React, { useState, useEffect } from "react";
import axios from "axios";



const BookCards = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:4000/books") // Fixed endpoint name to match backend
      .then((resp) => {
        setBooks(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/books?search=${searchTerm}`);
      const data = await response.json();
      const filteredBooks = data.filter((book) =>
        Object.values(book).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setBooks(filteredBooks);
    } catch (error) {
      console.error(error);
      // handle error
    }
  };
  

  
  function handleClick(book) {
    const userId = localStorage.getItem("id");
    const borrowedBooks = books.filter(
      (item) => item.borrowed && item.userId === userId
    );
  
    if (borrowedBooks.length >= 3) {
      console.log("You have already borrowed 3 books.");
      return;
    }
  
    if (!book.borrowed) {
      const updatedData = books.map((item) => {
        if (item.id === book.id) {
          return {
            ...item,
            borrowed: true,
            buttonText: "Borrowing Requested",
            userId,
          };
        }
        return item;
      });
  
      console.log(`Sent borrowing request for book "${book.title}"`);
  
      setBooks(updatedData);
  
      // Send borrow request to backend API
      axios
        .post(`http://localhost:4000/Books/borrow/${book.id}/${userId}`)
        .then((response) => {
          console.log(response.data.msg);
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 400) {
            setBooks((prevState) =>
              prevState.map((item) =>
                item.id === book.id
                  ? {
                      ...item,
                      borrowed: false,
                      buttonText: "Borrow",
                    }
                  : item
              )
            );
            alert(error.response.data.errors[0].msg);
          }
        });
    }
  }
  

  return (
    <div className="book-list">
        <div className="search">
        <input
          type="text"
          placeholder="Search for books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
      </div>
      <div className="card-list">
      {books.map((book) => (
        <div key={book.id} className="card">
          <img src={book.image_url} alt={book.title} />
          <div className="card-content">
            <h2>{book.title}</h2>
            <p>By {book.author}</p>
            <p>Subject: {book.subject}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Rack number: {book.rack_number}</p>
            <button
              className="borrow"
              style={book.borrowed ? { backgroundColor: "gray" } : {}}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(book);
              }}
              disabled={book.borrowed}
            >
              {!book.borrowed
                ? "Borrow"
                : book.buttonText || "Borrowing Requested"}
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BookCards;
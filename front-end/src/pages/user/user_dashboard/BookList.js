import React, { useState } from "react";
import "./BookList.css";
import HeaderUser from "../header/HeaderUser";
import BookCards from "../book_cards/BookCards";

function BookList() {

  const [books,] = useState([]);


  
  

  return (
    <div className="book-list">
      <HeaderUser />
      <main>
        <BookCards books={books} />
      </main>
    </div>
  );
}

export default BookList;

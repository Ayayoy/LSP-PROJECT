import React from "react";

function BookItem(props) {
  const { filteredData } = props;

  return (
    <div className="card-list">
      {filteredData.map((book) => (
        <div key={book.id} className="card">
          <img src={book.photo} alt={book.title} />
          <div className="card-content">
            <h2>{book.title}</h2>
            <p>By {book.author}</p>
            <p>Category: {book.subject}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Rack number: {book.rack_number}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookItem;

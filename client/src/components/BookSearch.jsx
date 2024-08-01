import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_BOOKS } from "../queries";


const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(SEARCH_BOOKS, {
    variables: { query: searchTerm },
    skip: !searchTerm,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.elements.search.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search for books" />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.searchBooks.map((book, index) => (
            <li key={index}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookSearch;



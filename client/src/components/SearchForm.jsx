import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      const booksData = response.data.docs.map(book => ({
        id: book.key, // Book ID for detailed view
        title: book.title,
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : '',
        author: book.author_name ? book.author_name.join(', ') : 'Unknown',
        description: book.first_sentence ? book.first_sentence.join(' ') : 'No description available'
      }));
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for books..." 
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {books.map((book) => (
          <div key={book.id} style={{ margin: '20px' }}>
            <Link to={`/book/${book.id}`}>
              <img src={book.cover} alt={book.title} style={{ width: '100px', height: '150px' }} />
            </Link>
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
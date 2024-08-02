import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookDetail = ({ match }) => {
  const [book, setBook] = useState(null);
  const [addedToList, setAddedToList] = useState(false);
  const bookId = match.params.id;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org${bookId}.json`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddToList = () => {
    setAddedToList(true);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      {book.cover && <img src={`https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`} alt={book.title} />}
      <p><strong>Author:</strong> {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
      <p><strong>Description:</strong> {book.description ? book.description.value : 'No description available'}</p>
      <button onClick={handleAddToList}>
        {addedToList ? 'Added to List' : 'Add to List'}
      </button>
    </div>
  );
};

export default BookDetail;
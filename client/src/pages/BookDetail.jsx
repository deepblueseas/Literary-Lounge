import React, { useEffect, useState } from 'react';
import axios from 'axios';

const notFoundImage = '/images/noPhoto.jpg';

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
  
    const handleAddToList = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/addBook', {
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown',
          datePublished: book.publish_date ? new Date(book.publish_date).toISOString() : null,
          summary: book.description ? book.description.value : 'No description available',
          rating: null, // Assuming the rating is not available from the API response
          cover: book.cover ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg` : notFoundImage,
        });
        if (response.status === 201) {
          setAddedToList(true);
        }
      } catch (error) {
        console.error('Error adding book to list:', error);
      }
    };
  
    if (!book) return <div>Loading...</div>;
  
    return (
      <div>
        <h1>{book.title}</h1>
        <img 
          src={book.cover ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg` : notFoundImage} 
          alt={book.title} 
        />
        <p><strong>Author:</strong> {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
        <p><strong>Description:</strong> {book.description ? book.description.value : 'No description available'}</p>
        <button onClick={handleAddToList}>
          {addedToList ? 'Added to List' : 'Add to List'}
        </button>
      </div>
    );
  };
  
  export default BookDetail;
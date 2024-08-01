import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';

const UpdateBook = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [summary, setSummary] = useState('');

  const { loading, error, data } = useQuery(GET_BOOKS);
  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook({ variables: { id, title, author, genre, publishedDate, summary } });
    setId('');
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublishedDate('');
    setSummary('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Book</h2>
      <select value={id} onChange={(e) => setId(e.target.value)}>
        <option value="" disabled>Select a book</option>
        {data.books.map((book) => (
          <option key={book.id} value={book.id}>{book.title}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
      />
      <textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBook;
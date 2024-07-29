import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries';

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data.books.map(({ id, title, author }) => (
          <li key={id}>{title} by {author}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
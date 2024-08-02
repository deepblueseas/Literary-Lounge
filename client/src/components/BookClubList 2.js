import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKCLUBS } from '../queries';

const BookClubList = () => {
  const { loading, error, data } = useQuery(GET_BOOKCLUBS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... </p>;

  return (
    <div>
      <h2>Put the Club in the Books</h2>
      <ul>
        {data.bookclubs.map(({ id, name, description }) => (
          <li key={id}>{name} - {description}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookClubList;
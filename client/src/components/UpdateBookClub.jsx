import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BOOKCLUB } from '../mutations';
import { GET_BOOKCLUBS } from '../queries';

const UpdateBookClub = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { loading, error, data } = useQuery(GET_BOOKCLUBS);
  const [updateBookClub] = useMutation(UPDATE_BOOKCLUB, {
    refetchQueries: [{ query: GET_BOOKCLUBS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBookClub({ variables: { id, name, description } });
    setId('');
    setName('');
    setDescription('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Book Club</h2>
      <select value={id} onChange={(e) => setId(e.target.value)}>
        <option value="" disabled>Select a book club</option>
        {data.bookclubs.map((bookclub) => (
          <option key={bookclub.id} value={bookclub.id}>{bookclub.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update Book Club</button>
    </form>
  );
};

export default UpdateBookClub;
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKCLUB } from '../mutations';
import { GET_BOOKCLUBS } from '../queries';

const AddBookClub = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [addBookClub] = useMutation(ADD_BOOKCLUB, {
    refetchQueries: [{ query: GET_BOOKCLUBS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBookClub({ variables: { name, description } });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book Club</h2>
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
      <button type="submit">Add Book Club</button>
    </form>
  );
};

export default AddBookClub;
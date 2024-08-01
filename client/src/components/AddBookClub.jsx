import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOKCLUB } from '../mutations';
import { GET_BOOKCLUBS } from '../queries';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Heading
} from '@chakra-ui/react';

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

    <Box maxWidth="500px" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="lg">
    <Heading as="h2" size="lg" mb={5}>Add Book Club</Heading>
    <form onSubmit={handleSubmit}>
      <FormControl id='name' mb={3}>
        <FormLabel>Name</FormLabel>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </FormControl>
      <FormControl id='description' mb={3}>
        <FormLabel>Description</FormLabel>
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      </FormControl>
      <Button type="submit" colorScheme='teal' mt={4}>Add Book Club</Button>
    </form>
    </Box>
  );
};

export default AddBookClub;
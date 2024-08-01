import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../mutations';
import { GET_BOOKS } from '../queries';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [summary, setSummary] = useState('');

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { title, author, genre, publishedDate, summary } });
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublishedDate('');
    setSummary('');
  };

  return (
    <Box maxWidth="500px" mx="auto" mt={5} p={5} borderWidth={"1px"} borderRadius="lg">
    <Heading as="h2" size="lg" mb={5}>Add Book</Heading>
    <form onSubmit={handleSubmit}>
      <FormControl id='title' mb={3}>
        <FormLabel>Title</FormLabel>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      </FormControl>
      <FormControl id='author' mb={3}>
        <FormLabel>Author</FormLabel>
      <Input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      </FormControl>
      <FormControl id='genre' mb={3}>
        <FormLabel>Genre</FormLabel>
      <Input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      </FormControl>
      <FormControl id='publishedDate' mb={3}>
        <FormLabel>Published Date</FormLabel>
      <Input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.target.value)}
      />
      </FormControl>
      <FormControl id='summary' mb={3}>
        <FormLabel>Summary</FormLabel>
      <Textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      </FormControl>
      <Button type="submit" colorScheme='teal' mt={4}>Add Book</Button>
    </form>
  );
};

export default AddBook;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Spinner, Flex, Container, Button } from '@chakra-ui/react';
import { gql, useMutation } from '@apollo/client';

const ADD_TO_READING_LIST = gql`
  mutation AddToReadingList($bookId: ID!) {
    addToReadingList(bookId: $bookId) {
      id
      savedBooks {
        id
        title
      }
    }
  }
`;

const notFoundImage = '/images/noPhoto.jpg';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [addToReadingList, { data, loading: adding, error: addToReadingListError }] = useMutation(ADD_TO_READING_LIST);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
        const bookData = {
          id: response.data.key,
          title: response.data.title,
          cover: response.data.cover_id ? `https://covers.openlibrary.org/b/id/${response.data.cover_id}-M.jpg` : notFoundImage,
          author: response.data.authors ? response.data.authors.map(author => author.name).join(', ') : 'Unknown',
          description: response.data.description ? response.data.description.value : 'No description available'
        };
        setBook(bookData);
        console.log("Book details fetched successfully:", bookData);
      } catch (fetchError) {
        setError(`Error fetching book details: ${fetchError.response ? fetchError.response.data : fetchError.message}`);
        console.error("Error fetching book details:", fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToReadingList = async () => {
    try {
      await addToReadingList({ variables: { bookId: book.id } });
      console.log("Book added to reading list:", data);
      if (addToReadingListError) {
        console.error("Error adding book to reading list:", addToReadingListError);
      }
    } catch (mutationError) {
      console.error("Error during mutation:", mutationError);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text>Error loading book details: {error}</Text>;

  return (
    <Container maxW="container.lg">
      {book && (
        <Box>
          <Heading mb={4}>{book.title}</Heading>
          <Image src={book.cover} alt={book.title} boxSize="200px" objectFit="cover" mb={4} />
          <Text fontSize="lg" mb={2}><strong>Author:</strong> {book.author}</Text>
          <Text mb={4}><strong>Description:</strong> {book.description}</Text>
          <Button colorScheme="green" onClick={handleAddToReadingList} isLoading={adding}>
            Add to Reading List
          </Button>
          {addToReadingListError && <Text color="red.500">Error adding book to reading list: {addToReadingListError.message}</Text>}
        </Box>
      )}
    </Container>
  );
};

export default BookDetail;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Spinner, Flex, Container } from '@chakra-ui/react';

const notFoundImage = '/images/noPhoto.jpg';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
      } catch (error) {
        setError(`Error fetching book details: ${error.response ? error.response.data : error.message}`);
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <Box p={4}>
      <Container maxW="container.lg">
        {loading ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="lg" />
          </Flex>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : book ? (
          <Box>
            <Heading mb={4}>{book.title}</Heading>
            <Image src={book.cover} alt={book.title} boxSize="200px" objectFit="cover" mb={4} />
            <Text fontSize="lg" mb={2}><strong>Author:</strong> {book.author}</Text>
            <Text mb={4}><strong>Description:</strong> {book.description}</Text>
          </Box>
        ) : (
          <Text>No book details found!</Text>
        )}
      </Container>
    </Box>
  );
};

export default BookDetail;
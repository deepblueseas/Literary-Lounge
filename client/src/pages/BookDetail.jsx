import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, Image, Spinner, Container } from '@chakra-ui/react';

const notFoundImage = '/images/noPhoto.jpg';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
        const bookData = {
          id: response.data.key,
          title: response.data.title,
          cover: response.data.cover_id ? `https://covers.openlibrary.org/b/id/${response.data.cover_id}-L.jpg` : notFoundImage,
          author: response.data.authors ? response.data.authors.map(author => author.name).join(', ') : 'Unknown',
          description: response.data.description ? response.data.description.value : 'No description available'
        };
        setBook(bookData);
      } catch (error) {
        setError('Error fetching book details');
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <Box p={4}>
      <Container maxW="container.lg">
        {loading ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="lg" />
          </Flex>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          book && (
            <Flex direction="column" align="center">
              <Image src={book.cover} alt={book.title} boxSize="200px" objectFit="cover" mb={4} />
              <Heading mb={2}>{book.title}</Heading>
              <Text fontSize="lg" mb={4}>by {book.author}</Text>
              <Text>{book.description}</Text>
            </Flex>
          )
        )}
      </Container>
    </Box>
  );
};

export default BookDetail;
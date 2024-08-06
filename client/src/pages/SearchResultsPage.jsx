import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { Box, Flex, Heading, Text, Image, Spinner, Container } from '@chakra-ui/react';

const notFoundImage = '/images/noPhoto.jpg';

const SearchResultsPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
        const booksData = response.data.docs
          .filter(book => book.type === 'work' && book.cover_i && book.first_sentence)
          .map(book => ({
            id: book.key,
            title: book.title,
            cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : notFoundImage,
            author: book.author_name ? book.author_name.join(', ') : 'Unknown'
          }));
        setBooks(booksData);
      } catch (error) {
        setError('Error fetching books');
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <Box p={4}>
      <Container maxW="container.lg">
        <Heading mb={4}>Search Results for: {query}</Heading>
        {loading ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="lg" />
          </Flex>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : books.length === 0 ? (
          <Text>No results found</Text>
        ) : (
          <Flex direction="column">
            {books.map((book) => (
              <Link key={book.id} to={`${book.id}`}>
                <Flex align="center" mb={4} p={2} borderWidth="1px" borderRadius="lg" _hover={{ bg: 'gray.100' }} cursor="pointer">
                  <Image src={book.cover} alt={book.title} boxSize="100px" objectFit="cover" mr={4} />
                  <Flex direction="column">
                    <Heading size="md">{book.title}</Heading>
                    <Text fontSize="sm">by {book.author}</Text>
                  </Flex>
                </Flex>
              </Link>
            ))}
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default SearchResultsPage;
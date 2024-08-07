import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Flex, Stack, Text, Image, IconButton, InputGroup, Input, InputRightElement, Center } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const notFoundImage = '/images/noPhoto.jpg';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    setQuery(queryParam || '');

    if (queryParam) {
      const fetchBooks = async () => {
        try {
          const response = await axios.get(`https://openlibrary.org/search.json?q=${queryParam}`);
          const booksData = response.data.docs.map(book => ({
            id: book.key.replace('/works/', ''),
            title: book.title,
            cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : notFoundImage,
            author: book.author_name ? book.author_name.join(', ') : 'Unknown',
            description: book.first_sentence ? book.first_sentence.join(' ') : 'No description available'
          }));
          setBooks(booksData);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };

      fetchBooks();
    }
  }, [location.search]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Box as="form" onSubmit={handleSearch} mb={4} display="flex" alignItems="center" justifyContent="center">
        <InputGroup>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            size="lg"
            borderColor="green.200"
            focusBorderColor="green.400"
            borderRadius="full"
            pr="9.5rem"
            _placeholder={{ color: 'gray.500' }}
          />
          <InputRightElement>
            <IconButton
              type="submit"
              aria-label="Search"
              icon={<SearchIcon />}
              colorScheme="green"
              size="lg"
              borderRadius="full"
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Flex direction="column" overflowY="auto" flex="1" p={4}>
        <Stack spacing={4}>
          {books.length > 0 ? (
            books.map((book) => (
              <Box key={book.id} p={4} borderWidth={2} borderRadius="md" mb={4} shadow="md" borderColor="green.200">
                <Link to={`/book/${book.id}`}>
                  <Image src={book.cover} alt={book.title} boxSize="100px" objectFit="cover" mb={2} borderRadius="md" />
                </Link>
                <Box>
                  <Link to={`/book/${book.id}`}>
                    <Text fontWeight="bold" mb={1}>{book.title}</Text>
                  </Link>
                  <Text color="gray.600">{book.author}</Text>
                </Box>
              </Box>
            ))
          ) : (
            <Text>No results found.</Text>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default SearchResults;
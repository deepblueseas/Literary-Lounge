import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Flex } from '@chakra-ui/react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSearch}>
        <Flex align="center">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            variant="outline"
            mr={2}
            size="lg"
            w={{ base: '100%', md: 'auto' }}
          />
          <Button type="submit" bg="primary" color="white" size="lg">
            Search
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SearchBar;
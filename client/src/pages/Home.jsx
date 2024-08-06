import React from 'react';
import SearchBar from '../components/SearchForm';
import { Box, Container, Heading } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box p={4}>
      <Container maxW="container.lg">
        <Heading mb={4}>Welcome to The Literary Lounge!</Heading>
        <SearchBar />
      </Container>
    </Box>
  );
};

export default Home;
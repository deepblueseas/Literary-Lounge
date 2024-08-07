import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import BookClubList from '../components/BookClubList';
import BookList from '../components/BookList';

const Profile = () => {
  // Static dummy data
  const dummyUser = {
    username: 'coffee_addict',
    savedBooks: [
      { _id: '1', title: '1984', author: 'George Orwell', year: 1949 },
      { _id: '2', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954 },
    ],
    bookClubs: [
      { _id: '1', name: 'The Literary Circle', description: 'A gathering of book enthusiasts...', location: 'virtual' },
      { _id: '2', name: 'Chapter Chasers', description: 'A dynamic book club...', location: 'Cat Cafe' },
    ],
  };

  return (
    <Container centerContent p={6}>
      <Box w="100%" maxW="lg" p={6} boxShadow="md" borderRadius="md" textAlign="center" bg="gray.50">
        <Heading as="h2" size="lg" mb={4} color="#35adb6" textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)">
          {dummyUser.username}'s Saved Books and Book Clubs
        </Heading>
        <Heading as="h3" size="md" mb={2} color="#6abb75" textShadow="1px 1px 3px rgba(0, 0, 0, 0.2)">
          Saved Books
        </Heading>
        {dummyUser.savedBooks.length > 0 ? (
          <BookList books={dummyUser.savedBooks} />
        ) : (
          <Text>No saved books found.</Text>
        )}
        <Box my={4} p={4} border="1px dotted #1a1a1a" borderRadius="md" bg="white" boxShadow="sm">
          <Heading as="h3" size="md" mb={2} color="#6abb75" textShadow="1px 1px 3px rgba(0, 0, 0, 0.2)">
            Book Clubs
          </Heading>
          {dummyUser.bookClubs.length > 0 ? (
            <BookClubList bookClubs={dummyUser.bookClubs} />
          ) : (
            <Text>No book clubs found.</Text>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;

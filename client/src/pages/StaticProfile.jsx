import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import BookClubList from '../components/BookClubList';
import BookList from '../components/BookList';

const Profile = () => {
  // Static dummy data
  const dummyUser = {
    username: 'adventure_seeker',
    savedBooks: [
      { _id: '1', title: '1984' },
      { _id: '2', title: 'The Lord of the Rings' },
    ],
    bookClubs: [
      { _id: '1', name: 'Book Club A' },
      { _id: '2', name: 'Book Club B' },
    ],
  };

  return (
    <Container centerContent>
      <Box w="100%" maxW="lg" p={6} boxShadow="md" borderRadius="md">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          {dummyUser.username}'s saved books and book clubs
        </Heading>
        <Heading as="h3" size="md" mb={2}>
        Saved Books
        </Heading>
        {dummyUser.savedBooks?.length > 0 ? (
          <BookList savedBooks={dummyUser.savedBooks} />
        ) : (
          <Text>No saved books found.</Text>
        )}
        <Box className="my-4 p-4" border="1px dotted #1a1a1a" borderRadius="md">
          <Heading as="h3" size="md" mb={2}>
            Book Clubs
          </Heading>
          {dummyUser.bookClubs?.length > 0 ? (
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

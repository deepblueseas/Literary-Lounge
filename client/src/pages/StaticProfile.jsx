import React from 'react';
import { Box, Container, Heading, Text, Grid } from '@chakra-ui/react';
import BookClubList from '../components/BookClubList';
import BookList from '../components/BookList';
import '../App.css';

const Profile = () => {
  // Static dummy data
  const exampleBooks = [
    { _id: '1', title: '1984', author: 'George Orwell', year: 1949 },
    { _id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { _id: '3', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
    { _id: '4', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { _id: '5', title: 'Moby-Dick', author: 'Herman Melville', year: 1851 },
  ];

  const dummyUser = {
    username: 'coffee_l0ver',
    savedBooks: [], 
    bookClubs: [
      { _id: '1', name: 'The Literary Circle', description: 'A gathering of book enthusiasts...', location: 'virtual' },
      { _id: '2', name: 'Chapter Chasers', description: 'A dynamic book club...', location: 'Cat Cafe' },
    ],
  };

  return (
    <Container p={6} centerContent>
      <Box w="100%" maxW="1500px" p={6} boxShadow="md" borderRadius="md" bg="gray.50">
        <Heading as="h2" size="lg" mb={4} color="#35adb6" textShadow="2px 2px 4px rgba(0, 0, 0, 0.2)" textAlign="center">
          {dummyUser.username}'s Saved Books and Book Clubs
        </Heading>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} justifyContent="center" alignItems="start">
          <Box 
            p={6} 
            border="1px dotted #1a1a1a" 
            borderRadius="md" 
            bg="white" 
            boxShadow="sm" 
            minW={{ base: '100%', md: '500px' }} 
            maxW="400px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading as="h3" size="lg" mb={2} color="#6abb75" textShadow="1px 1px 3px rgba(0, 0, 0, 0.2)">
              Book Clubs
            </Heading>
            <Heading size="md" className="no-clubs-yet">
              No book clubs saved yet! Browse below:
            </Heading>
            <BookClubList />
          </Box>
          <Box 
            p={6} 
            border="1px dotted #1a1a1a" 
            borderRadius="md" 
            bg="white" 
            boxShadow="sm" 
            minW={{ base: '100%', md: '500px' }} 
            maxW="400px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading as="h3" size="lg" mb={2} color="#6abb75" textShadow="1px 1px 3px rgba(0, 0, 0, 0.2)">
              Saved Books
            </Heading>
            {dummyUser.savedBooks.length > 0 ? (
              <BookList books={dummyUser.savedBooks} />
            ) : (
              <>
                <Heading size="md" className="no-saved-books-yet">
                  No book clubs saved yet! Browse below:
                </Heading>
                <BookList books={exampleBooks} />
              </>
            )}
          </Box>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
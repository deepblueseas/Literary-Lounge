import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Spinner, Box, Container, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { GET_ME } from '../utils/queries';
import BookClubList from '../components/BookClubList';
import BookList from '../components/BookList';
import Auth from '../utils/auth';

const Profile = () => {
  const { userId } = useParams();

  const { loading, data, error } = useQuery(GET_ME);

  const isLoggedIn = Auth.loggedIn();
  const loggedInUser = isLoggedIn ? Auth.getProfile()?.data : null;

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    console.error('Error loading profile:', error);
    return (
      <Container centerContent>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          Error loading profile: {error.message}
        </Alert>
      </Container>
    );
  }
console.log(data)
  if (!data?.me) {
    return (
      <Container centerContent>
        <Heading as="h4" size="md">
          User not found. Please check the userId or try again later.
        </Heading>
      </Container>
    );
  }

  const user = data.me;

  // // Redirect if the logged-in user is viewing their own profile
  // if (isLoggedIn && loggedInUser?.userId === userId) {
  //   return <Navigate to="/profile" />;
  // }

  return (
    <Container centerContent>
      <Box w="100%" maxW="lg" p={6} boxShadow="md" borderRadius="md">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          {user.username}'s saved books and book clubs
        </Heading>
        {user.savedBooks?.length > 0 ? (
          <BookList savedBooks={user.savedBooks} />
        ) : (
          <Text>No saved books found.</Text>
        )}
        <Box className="my-4 p-4" border="1px dotted #1a1a1a" borderRadius="md">
          <Heading as="h3" size="md" mb={2}>
            Book Clubs
          </Heading>
          {user.bookclubs?.length > 0 ? (
            <BookClubList bookclubs={user.bookclubs} />
          ) : (
            <Text>No book clubs found.</Text>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
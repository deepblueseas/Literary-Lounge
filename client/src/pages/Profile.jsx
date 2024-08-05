import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Heading, Text, Spinner, Flex, Grid, Image } from '@chakra-ui/react';
import Auth from '../utils/auth';
import { QUERY_USER_BY_ID } from '../utils/queries';

const Profile = () => {
  const { userId } = useParams();
  const isMe = !userId;

  const { loading, error, data } = useQuery(QUERY_USER_BY_ID, {
    variables: { userId: isMe ? Auth.getProfile().data._id : userId },
  });

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Heading as="h4" size="md">
          Error loading profile. Please try again later.
        </Heading>
      </Box>
    );
  }

  const profile = data?.userById || {};

  if (!profile?.username) {
    return (
      <Box textAlign="center" mt={5}>
        <Heading as="h4" size="md">
          You need to be logged in to see your profile page. Use the navigation
          links above to sign up or log in!
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading as="h2" size="xl">
        {isMe ? 'Your Profile' : `${profile.username}'s Profile`}
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={5}>
        <Box>
          <Heading as="h3" size="lg">Saved Books</Heading>
          {profile.savedBooks?.length > 0 ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={3}>
              {profile.savedBooks.map((book, index) => (
                <Box key={index} p={3} shadow="md" borderWidth="1px">
                  <Image src={book.image} alt={book.title} />
                  <Heading fontSize="xl" mt={2}>{book.title}</Heading>
                  <Text mt={2}>{book.authors}</Text>
                  <Text mt={2}>{book.description}</Text>
                </Box>
              ))}
            </Grid>
          ) : (
            <Text mt={2}>No saved books, yet.</Text>
          )}
        </Box>

        <Box>
          <Heading as="h3" size="lg">Book Clubs</Heading>
          {profile.bookClubs?.length > 0 ? (
            profile.bookClubs.map((club, index) => (
              <Box key={index} p={3} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{club.name}</Heading>
                <Text mt={4}>{club.description}</Text>
              </Box>
            ))
          ) : (
            <Text mt={2}>No book clubs, yet.</Text>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default Profile;

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_BOOKCLUBS } from '../utils/queries';
import { JOIN_BOOKCLUB } from '../utils/mutations';
import {
  Box,
  Button,
  Heading,
  Text,
  Grid,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const BookClubList = () => {
  const { loading, error, data } = useQuery(QUERY_BOOKCLUBS);

  const [joinBookClub] = useMutation(JOIN_BOOKCLUB);

  const handleJoin = async (bookclubId) => {
    if (!bookclubId) {
      alert('Invalid book club ID');
      return;
    }
    try {
      await joinBookClub({ variables: { bookclubId } });
      alert('Joined the book club successfully!');
    } catch (err) {
      console.error('Error joining book club:', err);
      alert('Failed to join the book club');
    }
  };

  if (loading) return <Spinner size="xl" />;
  if (error) return (
    <Alert status='error'>
      <AlertIcon />
      Error fetching book clubs
    </Alert>
  );

  return (
    <Box maxWidth="100%" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={5}>Put the Club in the Books</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {data.Bookclubs.map(({ id, clubName, description, location }) => (
          <Box 
            key={id} 
            p={4} 
            borderWidth="1px" 
            borderRadius="md" 
            bg="white" 
            boxShadow="sm" 
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Text fontWeight="bold" mb={2}>{clubName}</Text>
            <Text mb={2}>{description}</Text>
            <Text fontWeight="bold" mb={2}>Location:</Text>
            <Text mb={4}>{location}</Text>
            <Button mt="auto" colorScheme="teal" onClick={() => handleJoin(id)}>
              Join Book Club
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default BookClubList;

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_BOOKCLUBS } from '../utils/queries';
import { JOIN_BOOKCLUB } from '../utils/mutations';

import {
  Box,
  Button,
  Heading,
  Text,
  UnorderedList,
  ListItem,
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
  )

  return (
    <Box maxWidth="600px" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={5}>Put the Club in the Books</Heading>
      <UnorderedList>
        {data.Bookclubs.map(({ id, clubName, description, location }) => (
          <ListItem key={id} mb={2}>
            <Text fontWeight="bold">{clubName}</Text>
            <Text>{description}</Text>
            <Text fontWeight="bold">Location:</Text>
            <Text>{location}</Text>
            <Button mt={2} colorScheme="teal" onClick={() => handleJoin(id)}>
              Join Book Club
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
export default BookClubList;
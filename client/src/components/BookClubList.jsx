import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_BOOKCLUBS } from '../utils/queries';
import { JOIN_BOOKCLUB } from '../utils/mutations';

import {
  Box,
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

  const handleJoin = async (id) => {
    try {
      await joinBookClub({ variables: { id } });
      alert('Joined the book club successfully!');
    } catch (err) {
      console.error(err);
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
        {data.bookclubs.map(({ id, name, description, location }) => (
          <ListItem key={id} mb={2}>
            <Text  fontWeight="bold">{name}</Text>
            <Text>{description}</Text>
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
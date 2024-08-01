import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKCLUBS } from '../queries';
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
  const { loading, error, data } = useQuery(GET_BOOKCLUBS);
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
        {data.bookclubs.map(({ id, name, description }) => (
          <ListItem key={id} mb={2}>
            <Text  fontWeight="bold">{name}</Text>
            <Text>{description}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default BookClubList;
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching books
      </Alert>
    );

  return (
    <Box maxWidth="600px" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={5}>Books</Heading>
      <UnorderedList>
        {data.books.map(({ id, title, author }) => (
          <ListItem key={id} mb={2}>
            <Text  fontWeight="bold">{title}</Text>
            <Text>by {author}</Text>
             
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default BookList;

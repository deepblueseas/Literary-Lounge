import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { QUERY_BOOKCLUBS } from "../utils/queries";
import { CREATE_BOOKCLUB } from "../utils/mutations"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const BookClubForm = () => {
  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [createBookClub, { error }] = useMutation(CREATE_BOOKCLUB, {
    refetchQueries: [{ query: QUERY_BOOKCLUBS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBookClub({ variables: { clubName, description, location } });
      setClubName('');
      setDescription('');
      setLocation('');
    } catch (err) {
      console.error('Error creating book club:',err);
    }
  };
  return (
    <Box
      maxWidth="600px"
      mx="auto"
      mt={5}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
    >
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4}>
          <FormLabel>Club Name</FormLabel>
          <Input
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="description" mb={4}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="location" mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Create Book Club
        </Button>
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            Error creating book club
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default BookClubForm;

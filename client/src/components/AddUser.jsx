import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../mutations';
import { GET_USERS } from '../queries';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading
} from '@chakra-ui/react';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ variables: { username, email, password } });
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box maxWidth="500px" mx="auto" mt={5} p={5} borderWidth="1px" borderRadius="lg">
    <Heading as="h2" size="lg" mb={5}>Add User</Heading>
    <form onSubmit={handleSubmit}>
      <FormControl id='username' mb={3}>
        <FormLabel>Username</FormLabel>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </FormControl>
      <FormControl id='email' mb={3}>
        <FormLabel>Email</FormLabel>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </FormControl>
      <FormControl id='password' mb={3}>
        <FormLabel>Password</FormLabel>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </FormControl>
      <Button type="submit" colorScheme='teal' mt={4}>Add User</Button>
    </form>
    </Box>
  );
};

export default AddUser;
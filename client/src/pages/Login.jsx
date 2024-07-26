import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import { 
    Box, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Heading, 
    Text, 
    useToast 
  } from '@chakra-ui/react';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const toast = useToast();
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      toast({
        title: 'An error occurred.',
        description: e.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Box d="flex" flexDir="column" alignItems="center" mt={8}>
     <Box maxW="md" borderWidth={1} borderRadius="lg" p={6}>
     <Heading mb={4} as="h4" size="md" textAlign="center">
          Login
        </Heading>
            {data ? (
              <Text textAlign="center">
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
                </Text>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <FormControl mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              </FormControl>
          <FormControl mb={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              w="full"
              type="submit"
            >
              Submit
            </Button>
              </form>
            )}

            {error && (
          <Box mt={4} p={3} bg="red.500" color="white" borderRadius="md">
            {error.message}
          </Box>
            )}
        
      </Box>
    </Box>
  );
};

export default Login;

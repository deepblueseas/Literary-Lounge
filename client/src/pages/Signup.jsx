import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";


const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER); 

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
  
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
  
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error("Error during signup:", e);
      if (e.networkError) {
        console.error("Network error:", e.networkError);
      }
      if (e.graphQLErrors) {
        e.graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
    }
  };

  return (
    <Container centerContent>
      <Box w="100%" maxW="lg" p={6} boxShadow={"md"} borderRadius={"md"}>
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Sign Up
        </Heading>
        <VStack spacing={4}>
          {data ? (
            <Text>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </Text>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <VStack spacing={4}>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    className="form-input"
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username} 
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button colorScheme="teal" type="submit" w="full" mt={4}>
                  Submit
                </Button>
              </VStack>
            </form>
          )}

          {error && (
            <Alert status="error" mt={4} borderRadius="md">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Signup;

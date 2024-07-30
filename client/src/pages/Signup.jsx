import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../utils/mutations";
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
    name: "",
    email: "",
    password: "",
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

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
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
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
                <FormControl id="name" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    className="form-input"
                    placeholder="Your username"
                    name="name"
                    type="text"
                    value={formState.name}
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
                <Button
                colorScheme="teal"
                type="submit"
                w="full"
                mt={4}
                >
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

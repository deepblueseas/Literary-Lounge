import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider, Box, Container, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';

import customTheme from './theme';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <ApolloProvider client={client}>
        <Flex direction="column" minH="100vh" bg="gray.100" color="gray.800">
          <Box as='header' w="100%" bg="primary.500" p={4}>
            <Header />
          </Box>
          <Container as="main" flex="1" centerContent>
            <Outlet />
          </Container>
          <Box as='footer' w="100%" bg="primary.500" p={4}>
            <Footer />
          </Box>
        </Flex>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
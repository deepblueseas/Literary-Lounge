import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Container, Icon } from '@chakra-ui/react';
import { BookIcon } from '@chakra-ui/icons'; // Import Chakra UI icon
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Box bg="primary" color="white" mb={4} py={3}>
      <Container maxW="container.lg">
        <Flex direction="column" align="center" textAlign="center">
          <Flex align="center" mb={3}>
            <Icon as={BookIcon} w={8} h={8} mr={3} />
            <Link to="/">
              <Heading as="h1" size="2xl">
                Page Turners
              </Heading>
            </Link>
          </Flex>
          <Text fontSize="xl" fontWeight="bold">
            Your gateway to book clubs and literary adventures.
          </Text>
          <Flex mt={4}>
            {Auth.loggedIn() ? (
              <>
                <Button as={Link} to="/profile" bg="primary" color="white" variant="outline" m={2}>
                  My Profile
                </Button>
                <Button as={Link} to="/bookclubs" bg="primary" color="white" m={2}>
                  Browse Book Clubs
                </Button>
                <Button bg="primary" color="white" variant="outline" m={2} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" bg="primary" color="white" m={2}>
                  Login
                </Button>
                <Button as={Link} to="/signup" bg="secondary" color="white" variant="outline" m={2}>
                  Signup
                </Button>
                <Button as={Link} to="/bookclubs" bg="primary" color="white" m={2}>
                  Browse Book Clubs
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
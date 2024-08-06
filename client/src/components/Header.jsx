import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Container, Icon, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Auth from '../utils/auth';

const Header = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate('/login');
  };

   const loggedInUser = Auth.loggedIn() ? Auth.getProfile()?.data : null;
   console.log('loggedInUser', loggedInUser);

  return (
    <Box bg="primary" color="white" mb={4} py={3}>
      <Container maxW="container.lg">
        <Flex direction="column" align="center" textAlign="center">
          <Flex align="center" mb={3} justify="space-between" w="full">
            <Icon as={SearchIcon} w={8} h={8} mr={3} />
            <Link to="/">
              <Heading as="h1" size="2xl">
                The Literary Lounge
              </Heading>
            </Link>
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books..."
                variant="outline"
                mr={2}
                size="lg"
                w={{ base: '100%', md: 'auto' }}
              />
              <Button type="submit" bg="primary" color="white" size="lg">
                Search
              </Button>
            </form>
          </Flex>
          <Text fontSize="xl" fontWeight="bold">
            Your gateway to book clubs and literary adventures.
          </Text>
          <Flex mt={4}>
            {Auth.loggedIn() ? (
              <>
                <Button as={Link} to={`/profile/${loggedInUser?.username}`} bg="primary" color="white" variant="outline" m={2}>
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
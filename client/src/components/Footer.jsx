import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Icon, Text, Container } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import Chakra UI icons

const Footer = () => {
  return (
    <Box bg="primary" color="white" py={4}>
      <Container maxW="container.lg" textAlign="center">
        <Flex direction="column" align="center">
          <Flex mb={3}>
            <Link to="/" className="text-light mx-2">Home</Link>
            <Link to="/about" className="text-light mx-2">About Us</Link>
            <Link to="/privacy" className="text-light mx-2">Privacy Policy</Link>
            <Link to="/terms" className="text-light mx-2">Terms of Service</Link>
            <Link to="/faq" className="text-light mx-2">Help/FAQ</Link>
          </Flex>
          <Flex mb={3}>
            <a href="https://facebook.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <Icon as={FaFacebook} w={8} h={8} />
            </a>
            <a href="https://twitter.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <Icon as={FaTwitter} w={8} h={8} />
            </a>
            <a href="https://instagram.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <Icon as={FaInstagram} w={8} h={8} />
            </a>
            <a href="https://linkedin.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <Icon as={FaLinkedin} w={8} h={8} />
            </a>
            <a href="https://github.com/deepblueseas/Project-3" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
              <Icon as={FaGithub} w={8} h={8} />
            </a>
          </Flex>
          <Flex mb={3}>
            <Text>Contact us at: <a href="mailto:support@mybookpals.com" className="text-light">support@mybookpals.com</a></Text>
          </Flex>
          <Flex mb={3}>
            <Text>&copy; {new Date().getFullYear()} My Book Pals. All rights reserved.</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
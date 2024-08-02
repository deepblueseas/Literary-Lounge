import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <div className="mb-3">
          <Link to="/" className="text-light mx-2">Home</Link>
          <Link to="/about" className="text-light mx-2">About Us</Link>
          <Link to="/privacy" className="text-light mx-2">Privacy Policy</Link>
          <Link to="/terms" className="text-light mx-2">Terms of Service</Link>
          <Link to="/faq" className="text-light mx-2">Help/FAQ</Link>
        </div>
        <div className="mb-3">
          <a href="https://facebook.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://twitter.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://instagram.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://linkedin.com" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://github.com/deepblueseas/Project-3" className="text-light mx-2" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </div>
        <div className="mb-3">
          <p>Contact us at: <a href="mailto:support@mybookpals.com" className="text-light">support@mybookpals.com</a></p>
        </div>
        <div className="mb-3">
          <p>&copy; {new Date().getFullYear()} My Book Pals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
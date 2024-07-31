import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faBook} size="2x" className="mr-3" />
          <Link className="text-dark" to="/">
            <h1 className="m-0" style={{ fontSize: '3rem' }}>
              Page Turners
            </h1>
          </Link>
        </div>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Your gateway to book clubs and literary adventures.
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-light m-2" to="/profile">
                My Profile
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/bookclubs">
                Browse Book Clubs
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
              <Link className="btn btn-lg btn-primary m-2" to="/bookclubs">
                Browse Book Clubs
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

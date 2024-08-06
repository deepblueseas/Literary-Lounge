import { gql } from '@apollo/client';

// Important for useQuery: Each query we'd like to be able to perform gets exported out of our queries.js utility
export const QUERY_USER_BY_ID = gql`
  query userById($userId: ID!) {
    userById(userId: $userId) {
      _id
      username
      email
      savedBooks {
        _id
        title
      }
      bookClubs {
        _id
        name
      }
    }
  }
`;

// Query to get all users
export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        _id
        title
      }
      bookClubs {
        _id
        name
      }
    }
  }
`;

// Query to get all books
export const QUERY_BOOKS = gql`
  query getBooks {
    books {
      _id
      title
      author
      genre
      publishedDate
    }
  }
`;

// Query to get all book clubs
export const QUERY_BOOKCLUBS = gql`
  query getBookClubs {
    bookClubs {
      _id
      clubName
      description
      location
    }
  }
`;

// Query to get a single book by ID
export const QUERY_SINGLE_BOOK = gql`
  query getSingleBook($bookId: ID!) {
    book(bookId: $bookId) {
      _id
      title
      author
      genre
      publishedDate
      summary
    }
  }
`;

// Query to get a single book club by ID
export const QUERY_SINGLE_BOOKCLUB = gql`
  query getSingleBookClub($bookclubId: ID!) {
    bookClub(bookclubId: $bookclubId) {
      _id
      name
      description
      members {
        _id
        username
      }
      savedBooks {
        _id
        title
      }
    }
  }
`;

// see the BookSearch.jsx file
// does this conflict with other queries in this file?
export const SEARCH_BOOKS = gql`
  query searchBooks($query: String!) {
    searchBooks(query: $query) {
      title
      authors
      description
    }
  }
`;

import { gql } from '@apollo/client';

export const QUERY_USER_BY_ID = gql`
query UserById($userId: ID!) {
  userById(userId: $userId) {
    id
    username
    email
    savedBooks {
      id
      title
    }
    bookClubs {
      id
      name
    }
  }
}
`;


// Query to get all users
export const QUERY_USERS = gql`
  query getUsers {
    users {
      id
      username
      email
    }
  }
`;


// Query to get all books
export const QUERY_BOOKS = gql`
  query getBooks {
    books {
      id
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
      id
      name
      description
    }
  }
`;

// Query to get a single book by ID
export const QUERY_SINGLE_BOOK = gql`
  query getSingleBook($bookId: ID!) {
    book(bookId: $bookId) {
      id
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
      id
      name
      description
      members {
        id
        username
      }
      savedBooks {
        id
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

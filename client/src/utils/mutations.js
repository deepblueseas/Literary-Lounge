import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

// Mutation to add a new book
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $genre: String!, $publishedDate: String!, $summary: String!) {
    addBook(title: $title, author: $author, genre: $genre, publishedDate: $publishedDate, summary: $summary) {
      id
      title
      author
      genre
      publishedDate
      summary
    }
  }
`;

// Mutation to update a user
export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $email: String!) {
    updateUser(id: $id, email: $email) {
      id
      username
      email
    }
  }
`;

// Mutation to update a book
export const UPDATE_BOOK = gql`
  mutation updateBook($id: ID!, $summary: String!) {
    updateBook(id: $id, summary: $summary) {
      id
      title
      author
      summary
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
    }
  }
`;

// Mutation to delete a book
export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
    }
  }
`;

// Mutation to add a book to a user's saved books
export const ADD_BOOK_TO_USER = gql`
  mutation addBookToUser($userId: ID!, $bookId: ID!) {
    addBookToUser(userId: $userId, bookId: $bookId) {
      id
      username
      savedBooks {
        id
        title
      }
    }
  }
`;

// Mutation to remove a book from a user's saved books
export const REMOVE_BOOK_FROM_USER = gql`
  mutation removeBookFromUser($userId: ID!, $bookId: ID!) {
    removeBookFromUser(userId: $userId, bookId: $bookId) {
      id
      username
      savedBooks {
        id
        title
      }
    }
  }
`;

// Mutation to remove a user from a book club
export const REMOVE_USER_FROM_BOOKCLUB = gql`
  mutation removeUserFromBookClub($userId: ID!, $bookclubId: ID!) {
    removeUserFromBookClub(userId: $userId, bookclubId: $bookclubId) {
      id
      name
      members {
        id
        username
      }
    }
  }
`;

// Mutation to update book list
export const UPDATE_BOOK_LIST = gql`
  mutation updateBookList($id: ID!, $name: String!) {
    updateBookList(id: $id, name: $name) {
      id
      name
    }
  }
`;

// Mutation to add book to a book list
export const ADD_BOOK_TO_LIST = gql`
  mutation addBookToList($listId: ID!, $bookId: ID!) {
    addBookToList(listId: $listId, bookId: $bookId) {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

// Mutation to remove book from a book list
export const REMOVE_BOOK_FROM_LIST = gql`
  mutation removeBookFromList($listId: ID!, $bookId: ID!) {
    removeBookFromList(listId: $listId, bookId: $bookId) {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

//Mutation to create book club
export const CREATE_BOOKCLUB = gql`
  mutation addBookclub($clubName: String!, $description: String!, $location: String!) {
    addBookclub(clubName: $clubName, description: $description, location: $location) {
      id
      clubName
      description
      location
    }
  }
`;
//Mutation to join book club
export const JOIN_BOOKCLUB = gql`
  mutation JoinBookclub($bookclubId: ID!) {
    joinBookclub(bookclubId: $bookclubId) {
      id
      clubName
      description
      location
      members {
        id
        username
      }
    }
  }
`;

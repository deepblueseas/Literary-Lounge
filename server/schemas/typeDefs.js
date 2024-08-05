const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Book {
    id: ID!
    title: String!
    author: String!
    summary: String!
    genre: String
    rating: Int
    datePublished: Date
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    Bookclubs: [Bookclub]
  }

  type Bookclub {
    id: ID!
    clubName: String!
    description: String!
    location: String
    savedBooks: [Book]
  }

  input BookInput {
    id: ID!
    title: String!
    author: String!
    summary: String!
    genre: String
    rating: Int
    publishedDate: Date
  }

  input UserBookclub {
    id: ID!
    user_id: String!
    bookclub_id: String!
  }

  input UserBook {
    id: ID!
    user_id: String!
    book_id: String!
  }
    input BookclubBook {
    id: ID!
    book_id: String!
    bookclub_id: String!
  }
    input BookclubInput {
    id: ID!
    clubName: String!
    description: String!
    location: String
    savedBooks: [BookInput]
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
    users: [User]
    user(username: String!): User
    books: [Book]
    book(id: ID!): Book
    Bookclubs: [Bookclub]
    Bookclub(id: ID!): Bookclub
    searchBooks(query: String!): [Book]
    me: User
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(input: BookInput): Book
    deleteBook(id: ID!): Book
    saveBook(bookId: ID!): User
    removeBook(bookId: ID!): User
    addBookclub(input: BookclubInput): Bookclub
    saveBookclub(bookclubId: ID): User
    removeBookclub(bookclubId: ID!): User
  }
`;

module.exports = typeDefs;

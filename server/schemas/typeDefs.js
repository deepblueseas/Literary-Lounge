const typeDefs = `
    scalar Date

 type Book {
    title: String!
    authors: String!
    description: String!
    bookId: String!
    genre: String
    summary: String
    publishedDate: Date
  }

  type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookClubs: [Bookclub]
  }
type Bookclub {
    name: String!
    description: String!
    members: [User]
    savedBooks: [Book]
}
    input BookInput {
    authors: String!
    description: String!
    bookId: String!
    genre: String
    summary: String
    publishedDate: Date
  }

  input BookclubInput {
    name: String!
    description: String!
    members: [String]
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
    bookClubs: [Bookclub]
    bookClub(id: ID!): Bookclub
    searchBooks(query: String!): [Book]
  }

 type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(title: String!, authors: String!, description: String!, genre: String, summary: String, publishedDate: Date): Book
    deleteBook(id: ID!): Book
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
    saveBookclub(bookclub: BookclubInput!): User
    removeBookclub(bookclubId: ID!): User
  }
`;

module.exports = typeDefs;

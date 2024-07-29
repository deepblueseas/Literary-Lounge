const typeDefs = `
    scalar Date

 type Book {
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
    bookClubs: [Bookclub]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
    saveBookclub(book: BookclubInput!): User
    removeBookclub(BookclubId: ID!): User
  }
`;

module.exports = typeDefs;

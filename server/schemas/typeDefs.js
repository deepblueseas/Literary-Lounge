const typeDefs = `
 type Book {
    authors: String!
    description: String!
    bookId: String!
    genre: String
    publishedDate: Date
    summary: String
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

type Query {

  }

  type Mutation {

  }
`;

module.exports = typeDefs;
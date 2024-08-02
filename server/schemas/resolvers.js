const { GraphQLScalarType, Kind } = require('graphql');
const { User, Book, Bookclub } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const fetch = require('node-fetch');

// Custom Date Scalar Type
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom Date scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.toISOString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    users: async () => {
      return User.findAll({ include: ['savedBooks', 'bookClubs'] });
    },
    user: async (_, { username }) => {
      return User.findOne({
        where: { username },
        include: ['savedBooks', 'bookClubs']
      });
    },
    books: async () => {
      return Book.findAll();
    },
    book: async (_, { id }) => {
      return Book.findByPk(id);
    },
    bookClubs: async () => {
      return Bookclub.findAll({ include: ['members', 'savedBooks'] });
    },
    bookClub: async (_, { id }) => {
      return Bookclub.findByPk(id, { include: ['members', 'savedBooks'] });
    },
    searchBooks: async (_, { query }) => {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();
      return data.docs.map(book => ({
        title: book.title,
        authors: book.author_name?.[0],
        description: book.first_sentence?.[0] || 'No description available',
      }));
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addBook: async (_, { title, authors, description, genre, summary, publishedDate }) => {
      return await Book.create({ title, authors, description, genre, summary, publishedDate });
    },
    deleteBook: async (_, { id }) => {
      const book = await Book.findByPk(id);
      if (book) {
        await book.destroy();
        return book;
      }
      throw new Error('Book not found');
    },
    saveBook: async (_, { bookId }, context) => {
      if (context.user) {
        const user = await User.findByPk(context.user.id);
        await user.addSavedBooks(bookId); 
        return user.reload({ include: ['savedBooks', 'bookClubs'] });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const user = await User.findByPk(context.user.id);
        await user.removeSavedBooks(bookId); 
        return user.reload({ include: ['savedBooks', 'bookClubs'] });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveBookclub: async (_, { bookclubId }, context) => {
      if (context.user) {
        const user = await User.findByPk(context.user.id);
        await user.addBookclubs(bookclubId);
        return user.reload({ include: ['savedBooks', 'bookClubs'] });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBookclub: async (_, { bookclubId }, context) => {
      if (context.user) {
        const user = await User.findByPk(context.user.id);
        await user.removeBookclubs(bookclubId); 
        return user.reload({ include: ['savedBooks', 'bookClubs'] });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

  

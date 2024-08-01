const { GraphQLScalarType, Kind } = require('graphql')
const { User, Book, BookClub } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
      return User.find().populate('savedBooks').populate('bookClubs');
    },
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('savedBooks').populate('bookClubs');
    },
    books: async () => {
      return Book.find();
    },
    bookClubs: async () => {
      return BookClub.find().populate('members').populate('savedBooks');
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

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
    saveBook: async (_, { book }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: book } },
          { new: true }
        ).populate('savedBooks').populate('bookClubs');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks').populate('bookClubs');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveBookclub: async (_, { bookclub }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { bookClubs: bookclub } },
          { new: true }
        ).populate('savedBooks').populate('bookClubs');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBookclub: async (_, { bookclubId }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { $pull: { bookClubs: { bookclubId } } },
          { new: true }
        ).populate('savedBooks').populate('bookClubs');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;


// api calls to open library
// this will need to get integrated into the top part


const fetch = require('node-fetch');

const resolvers = {
  Query: {
    books: async () => await Book.findAll(),
    book: async (_, { id }) => await Book.findByPk(id),
    searchBooks: async (_, { query }) => {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();
      return data.docs.map(book => ({
        title: book.title,
        author: book.author_name?.[0],
        description: book.first_sentence?.[0] || 'No description available',
      }));
    },
  },
  Mutation: {
    addBook: async (_, { title, author, description }) => {
      return await Book.create({ title, author, description });
    },
    deleteBook: async (_, { id }) => {
      const book = await Book.findByPk(id);
      if (book) {
        await book.destroy();
        return book;
      }
      throw new Error('Book not found');
    },
  },
};

module.exports = resolvers;
  
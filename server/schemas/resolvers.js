const { GraphQLScalarType, Kind } = require('graphql');
const { User, Book, BookClub } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const fetch = require('node-fetch');

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
    book: async (_, { id }) => {
      return Book.findById(id);
    },
    bookClubs: async () => {
      return BookClub.find().populate('members').populate('savedBooks');
    },
    bookClub: async (_, { id }) => {
      return BookClub.findById(id).populate('members').populate('savedBooks');
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
    addBook: async (_, { title, authors, description, genre, summary, publishedDate }) => {
      return await Book.create({ title, authors, description, genre, summary, publishedDate });
    },
    deleteBook: async (_, { id }) => {
      const book = await Book.findById(id);
      if (book) {
        await book.remove();
        return book;
      }
      throw new Error('Book not found');
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
          { $pull: { savedBooks: { _id: bookId } } },
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
          { $pull: { bookClubs: { _id: bookclubId } } },
          { new: true }
        ).populate('savedBooks').populate('bookClubs');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

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
      try {
        return await User.findAll({ include: ['savedBooks', 'Bookclub'] });
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users');
      }
    },
    user: async (_, { username }) => {
      try {
        return await User.findOne({ where: { username }, include: ['savedBooks', 'Bookclub'] });
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Error fetching user');
      }
    },
    userById: async (_, { userId }) => {
      try {
        return await User.findByPk(userId, { include: ['savedBooks', 'Bookclub'] });
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Error fetching user by ID');
      }
    },
    books: async () => {
      try {
        return await Book.findAll();
      } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Error fetching books');
      }
    },
    book: async (_, { id }) => {
      try {
        return await Book.findByPk(id);
      } catch (error) {
        console.error('Error fetching book:', error);
        throw new Error('Error fetching book');
      }
    },
    bookClubs: async () => {
      try {
        return await Bookclub.findAll({ include: ['members', 'savedBooks'] });
      } catch (error) {
        console.error('Error fetching book clubs:', error);
        throw new Error('Error fetching book clubs');
      }
    },
    bookClub: async (_, { id }) => {
      try {
        return await Bookclub.findByPk(id, { include: ['members', 'savedBooks'] });
      } catch (error) {
        console.error('Error fetching book club:', error);
        throw new Error('Error fetching book club');
      }
    },
    searchBooks: async (_, { query }) => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        const data = await response.json();
        return data.docs.map(book => ({
          title: book.title,
          authors: book.author_name?.[0],
          description: book.first_sentence?.[0] || 'No description available',
        }));
      } catch (error) {
        console.error('Error searching books:', error);
        throw new Error('Error searching books');
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      try {
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
      } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Error logging in');
      }
    },
    addUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Error adding user');
      }
    },
    addBook: async (_, { title, authors, description, genre, summary, publishedDate }) => {
      try {
        return await Book.create({ title, authors, description, genre, summary, publishedDate });
      } catch (error) {
        console.error('Error adding book:', error);
        throw new Error('Error adding book');
      }
    },
    deleteBook: async (_, { id }) => {
      try {
        const book = await Book.findByPk(id);
        if (book) {
          await book.destroy();
          return book;
        }
        throw new Error('Book not found');
      } catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('Error deleting book');
      }
    },
    saveBook: async (_, { bookId }, context) => {
      if (context.user) {
        try {
          const user = await User.findByPk(context.user.id);
          await user.addSavedBooks(bookId); 
          return await user.reload({ include: ['savedBooks', 'bookClubs'] });
        } catch (error) {
          console.error('Error saving book:', error);
          throw new Error('Error saving book');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        try {
          const user = await User.findByPk(context.user.id);
          await user.removeSavedBooks(bookId); 
          return await user.reload({ include: ['savedBooks', 'bookClubs'] });
        } catch (error) {
          console.error('Error removing book:', error);
          throw new Error('Error removing book');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveBookclub: async (_, { bookclubId }, context) => {
      if (context.user) {
        try {
          const user = await User.findByPk(context.user.id);
          await user.addBookclubs(bookclubId);
          return await user.reload({ include: ['savedBooks', 'bookClubs'] });
        } catch (error) {
          console.error('Error saving book club:', error);
          throw new Error('Error saving book club');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBookclub: async (_, { bookclubId }, context) => {
      if (context.user) {
        try {
          const user = await User.findByPk(context.user.id);
          await user.removeBookclubs(bookclubId); 
          return await user.reload({ include: ['savedBooks', 'bookClubs'] });
        } catch (error) {
          console.error('Error removing book club:', error);
          throw new Error('Error removing book club');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

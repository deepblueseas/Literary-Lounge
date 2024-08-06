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

      return User.findAll({
        include: [
          {
            model: Book,
            as: 'savedBooks'
          },
          {
            model: Bookclub,
            as: 'Bookclubs'
          }
        ]
      });
    },
    userByUsername: async (_, { username }) => {
      try {
        if (!username) {
          throw new Error('Username is required');
        }

        const user = await User.findOne({
          where: { username },
          include: [
            { model: Book, as: 'savedBooks' },
            { model: Bookclub, as: 'bookclubs' }
          ]
        });

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('Error fetching user by username');
      }
    },
  },
};

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

    Bookclubs: async () => {
      return Bookclub.findAll({ include: [
        {
          model: Book,
          as: 'savedBooks'
        },
      ] });
    },
    Bookclub: async (_, { id }) => {
      return Bookclub.findByPk(id, {
        include: [
          {
            model: Book,
            as: 'savedBooks'
          }
        ]
      });
    },
    searchBooks: async (_, { query }) => {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();
      return data.docs.map(book => ({
        title: book.title,
        authors: book.author_name?.[0],
        summary: book.first_sentence?.[0] || 'No description available',
      }));
    }
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
        // Log input data
        console.log('Attempting to create user with:', { username, email, password });
        
        // Create user
        const user = await User.create({ username, email, password });
    
        // Log the created user
        console.log('User created:', user);
    
        // Generate token
        const token = signToken(user);
    
        return { token, user };
      } catch (error) {
        // Log the error
        console.error('Error adding user:', error);
    
        // Rethrow the error
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
        const user = await User.findByPk(context.user.id);
        await user.addSavedBooks(bookId); 
        return user.reload({ include: [
          {
          model: Book,
          as: 'savedBooks'
          },
        { 
          model: Bookclub,
          as: 'Bookclubs'
          },
        ]
         });

      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {

        const user = await User.findByPk(context.user.id);
        await user.removeSavedBooks(bookId); 
        return user.reload({ include: [
          {
          model: Book,
          as: 'savedBooks'
          },
        { 
          model: Bookclub,
          as: 'Bookclubs'
          },] 
        });

      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addBookclub: async (_, { clubName, description, location }) => {
      return await Bookclub.create({ clubName, description, location });
    },
    saveBookclub: async (_, { bookclubId }, context) => {
      if (context.user) {
        const user = await User.findByPk(context.user.id);
        await user.addBookclubs(bookclubId);
        return user.reload({ include: [
          {
          model: Book,
          as: 'savedBooks'
          },
        { 
          model: Bookclub,
          as: 'Bookclubs'
          },] 
        });

      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBookclub: async (_, { bookclubId }, context) => {
      if (context.user) {
        const user = await User.findByPk(context.user.id, {
          include: [
            {
              model: Book,
              as: 'savedBooks'
            },
            {
              model: Bookclub,
              as: 'Bookclubs'
            }
          ]
        });

        if (!user) {
          throw new Error('User not found');
        }

        await user.removeBookclub(bookclubId);

        return user.reload({
          include: [
            {
              model: Book,
              as: 'savedBooks'
            },
            {
              model: Bookclub,
              as: 'Bookclubs'
            }
          ]
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;

const { GraphQLScalarType, Kind } = require('graphql');
const { User, Book, BookClub } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const fetch = require('node-fetch');

const resolvers = {
  Query: {
    users: async () => {
      return User.findAll({
        include: [
          { model: Book, as: 'savedBooks' },
          { model: BookClub, as: 'bookClubs' }
        ]
      });
    },
    user: async (_, { username }) => {
      return User.findOne({
        where: { username },
        include: [
          { model: Book, as: 'savedBooks' },
          { model: BookClub, as: 'bookClubs' }
        ]
      });
    },
    books: async () => {
      return Book.findAll();
    },
    book: async (_, { id }) => {
      return Book.findById(id);
    },
    bookClubs: async () => {
      return BookClub.findAll({
        include: [
          { model: User, as: 'members' },
          { model: Book, as: 'savedBooks' }
        ]
      });
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
      const book = await Book.findById(id);
      if (book) {
        await book.remove();
        return book;
      }
      throw new Error('Book not found');
    },
    saveBook: async (_, { book }, context) => {
      if (context.user) {
        const user = await User.findByPk(context.user._id);
        if (user) {
          await user.addSavedBook(book);
          await user.reload({
            include: [
              { model: Book, as: 'savedBooks' },
              { model: BookClub, as: 'bookClubs' }
            ]
          });
          return user;
        }
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
        const user = await User.findByPk(context.user._id);
        if (user) {
          await user.addBookClub(bookclub);
          await user.reload({
            include: [
              { model: Book, as: 'savedBooks' },
              { model: BookClub, as: 'bookClubs' }
            ]
          });
          return user;
        }
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


// api calls to open library
// this will need to get integrated into the top part


// const fetch = require('node-fetch');

// const resolvers = {
//   Query: {
//     books: async () => await Book.findAll(),
//     book: async (_, { id }) => await Book.findByPk(id),
//     searchBooks: async (_, { query }) => {
//       const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
//       const data = await response.json();
//       return data.docs.map(book => ({
//         title: book.title,
//         author: book.author_name?.[0],
//         description: book.first_sentence?.[0] || 'No description available',
//       }));
//     },
//   },
//   Mutation: {
//     addBook: async (_, { title, author, description }) => {
//       return await Book.create({ title, author, description });
//     },
//     deleteBook: async (_, { id }) => {
//       const book = await Book.findByPk(id);
//       if (book) {
//         await book.destroy();
//         return book;
//       }
//       throw new Error('Book not found');
//     },
//   },
// };

// module.exports = resolvers;
  

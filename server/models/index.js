const User = require('./User');
const Book = require('./Book');
const Bookclub = require('./Bookclub');
const UserBookclub = require('./UserBookclub');
const UserBook = require('./UserBook');
const BookclubBook = require('./BookclubBook');

// user & book associations
User.belongsToMany(Book, { through: UserBook, as: 'savedBooks' });
Book.belongsToMany(User, { through: UserBook });

//user & bookclub associations
User.belongsToMany(Bookclub, { through: UserBookclub, as: 'Bookclubs' });
Bookclub.belongsToMany(User, { through: UserBookclub });

//bookclub & book associations
Bookclub.belongsToMany(Book, { through: BookclubBook, as: 'savedBooks' });
Book.belongsToMany(Bookclub, { through: BookclubBook });

module.exports = { User, Book, Bookclub, BookclubBook, UserBook, UserBookclub };


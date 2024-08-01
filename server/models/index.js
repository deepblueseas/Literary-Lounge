const Book = require('./Book');
const Bookclub = require('./BookClub');
const User = require('./User');
const UserBookclub = require('./UserBookclub');
const UserBook = require('./UserBook');


User.belongsToMany(Book, { through: UserBook, foreignKey: 'user_id', onDelete: 'CASCADE' });
Book.belongsToMany(User, { through: UserBook, foreignKey: 'book_id', onDelete: 'CASCADE' });

User.belongsToMany(Bookclub, { through: UserBookclub, foreignKey: 'user_id', onDelete: 'CASCADE' });
Bookclub.belongsToMany(User, { through: UserBookclub, foreignKey: 'bookclub_id', onDelete: 'CASCADE' });

module.exports = {
    Book,
    Bookclub,
    User,
    UserBook,
    UserBookclub,
}

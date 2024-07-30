const db = require('../config/connection.js');
const { User, Book, BookClub } = require('../models/index.js');
const userSeeds = require('./userSeeds.json');
const bookSeeds = require('./bookSeeds.json');
const bookClubSeeds = require('./bookClubSeeds.json');
const cleanDB = require('./cleanDB.js');

db.once('open', async () => {
  try {
    await cleanDB('Book', 'books');

    await cleanDB('User', 'users');

    // await cleanDB('Bookclub', 'bookclubs');

    await User.create(userSeeds);
    const books = await Book.insertMany(bookSeeds);
    const bookClubs = await BookClub.insertMany(bookClubSeeds);

    for (let i = 0; i < books.length; i++) {
      await User.findOneAndUpdate(
        {
          $addToSet: {
            books: books[0]._id,
          },
        }
      );
    }
    for (let i = 0; i < bookClubs.length; i++) {
      await User.findOneAndUpdate(
        {
          $addToSet: {
            bookClubs: bookClubs[0]._id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
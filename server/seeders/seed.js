const { User, Book, Bookclub, UserBookclub, UserBook, BookclubBook } = require('../models/index.js');
const userSeeds = require('./userSeeds.js');
const bookSeeds = require('./bookSeeds.json');
const bookClubSeeds = require('./bookClubSeeds.json');
const userBooks = require('./userBooks.json');
const userBookclubSeeds = require("./userBookclubs.json");
const bookClubBookSeeds = require('./bookClubBookSeeds.json');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');

    await User.bulkCreate(userSeeds, {
      individualHooks: true,
      returning: true,
    });
    console.log('User seeds created successfully.');

    await Book.bulkCreate(bookSeeds, {
      individualHooks: true,
      returning: true,
    });
    console.log('Book seeds created successfully.');

    await Bookclub.bulkCreate(bookClubSeeds, {
      individualHooks: true,
      returning: true,
    });
    console.log('Bookclub seeds created successfully.');

    await UserBookclub.bulkCreate(userBookclubSeeds, {
      individualHooks: true,
      returning: true,
    });
    await UserBook.bulkCreate(userBooks, {
      individualHooks: true,
      returning: true,
    });
    await BookclubBook.bulkCreate(bookClubBookSeeds, {
      individualHooks: true,
      returning: true,
    });
    console.log('UserBookclub seeds created successfully.');

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
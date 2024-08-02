const db = require('../config/connection.js');
const { User, Book, Bookclub, UserBookclub } = require('../models/index.js');
const userSeeds = require('./userSeeds.js');
const bookSeeds = require('./bookSeeds.json');
const bookClubSeeds = require('./bookClubSeeds.json');
const userBookclubSeeds = require("./userBookclubs.json");
const sequelize = require('../config/connection');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeeds, {
      individualHooks: true,
      returning: true,
    });

    await Book.bulkCreate(bookSeeds, {
      individualHooks: true,
      returning: true,
    });

    await Bookclub.bulkCreate(bookClubSeeds, {
      individualHooks: true,
      returning: true,
    });
    await UserBookclub.bulkCreate(userBookclubSeeds, {
      individualHooks: true,
      returning: true,
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
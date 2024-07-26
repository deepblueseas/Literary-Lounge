import db from '../config/connection';
import { User, Book } from '../models';
import userSeeds from './userSeeds.json';
import bookSeeds from './bookSeeds.json';
import cleanDB from './cleanDB';

db.once('open', async () => {
  try {
    await cleanDB('Book', 'books');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < bookSeeds.length; i++) {
      const { _id } = await Book.create(bookSeeds[i]);
      const updatedUser = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
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
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

const userData = [
  {
    "username": "coffee_addict",
    "email": "sal@hotmail.com",
    "password": "password12345",
  },
  {
    "username": "nature_lover",
    "email": "sal@gmail.com",
    "password": "password12445",
  },
  {
    "username": "bibliophile",
    "email": "ttaylor@hotmail.com",
    "password": "password1234",
  },
  {
    "username": "adventure_seeker",
    "email": "sams@hotmail.com",
    "password": "password2345",
  },
  {
    "username": "wanderlust",
    "email": "saint@hotmail.com",
    "password": "password1234445",
  },
  {
    "username": "fitness_guru",
    "email": "rthomas@hotmail.com",
    "password": "password12345",
  }
];

const userSeeds = async () => {
  // Hash the passwords before seeding
  for (let user of userData) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

module.exports = userSeeds;
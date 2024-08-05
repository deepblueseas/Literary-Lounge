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
    "password": "password12345",
  },
  {
    "username": "bibliophile",
    "email": "ttaylor@hotmail.com",
    "password": "password12345",
  },
  {
    "username": "adventure_seeker",
    "email": "sams@hotmail.com",
    "password": "password12345",
  },
  {
    "username": "wanderlust",
    "email": "saint@hotmail.com",
    "password": "password12345",
  },
  {
    "username": "fitness_guru",
    "email": "rthomas@hotmail.com",
    "password": "password12345",
  }
];

const userSeeds = () => {
  // Hash the passwords before seeding

  return userData
};

module.exports = userSeeds(userData);
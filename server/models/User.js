const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address']
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
      }
    ],
    bookclubs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bookclub'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

const User = model('User', userSchema);

module.exports = User;
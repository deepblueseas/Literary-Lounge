const { Schema, model } = require('mongoose');

const bookclubSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: String,
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  });
  
  const Bookclub = model('Bookclub', bookclubSchema);

  module.exports = Bookclub;
  
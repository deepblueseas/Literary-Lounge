const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: String,
    publishedDate: Date,
    summary: String,
  });
  
  const Book = model('Book', bookSchema);

  module.exports = Book;
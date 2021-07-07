const mongoose = require('mongoose');
const Author = require('./author');
//BOOK SCHEMA
const BookSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  author: Author.schema,
  genre:{
    type:String,
    required:true
  }
})

module.exports = new mongoose.model('Book', BookSchema);

const mongoose = require('mongoose');
const Author = require('./author');
const yup = require('yup');

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

const validateBook = book => {
  const schema = yup.object().shape({
    bookName:yup.string().required(),
    authorName: yup.string().required(),
    authorAge: yup.number().required().min(10,'Age must be greater than 10').max(150,'Age must be less than 250'),
    genre:yup.string().required()
  })

  return schema
  .validate(book)
  .then(book => book)
  .catch(error => {
    return {
      message: error.message
    }
  });
}

exports.Book = new mongoose.model('Book', BookSchema);
exports.validateBook = validateBook;

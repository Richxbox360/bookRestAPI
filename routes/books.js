const express = require('express');
const router = express.Router();
const {Book, validateBook} = require('../models/books');

//POST, create a new BOOK
router.post('/', async(req,res) => {
  const error = await validateBook(req.body);
  if(error.message) res.status(400).send(error.message);
  book = new Book({
    name:req.body.bookName,
    author: {
      name:req.body.authorName,
      age:req.body.authorAge
    },
    genre:req.body.genre
  });
  book.save().then(book => {
    res.send(book);
  }).catch(error => {
    res.status(500).send("Book couldnt be created")
  })
})

//Get all BookSchema

router.get('/', (req,res) => {
  Book.find()
  .then(books => res.send(books))
  .catch(error => {
    res.status(500).send("Something went wrong");
  });
})

//Get the book by id
router.get('/:bookId', async (req,res) => {
  const book = await Book.findById(req.params.bookId);
  if(!book) res.status(404).send("Book not found");
  res.send(book);
})

//Update the book
router.put('/:bookId', async (req,res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, {
    name:req.body.bookName,
    author: {
      name:req.body.authorName,
      age:req.body.authorAge
    }
  },
  {new: true}
)
  if(!updatedBook) res.status(404).send("Book not found");
  res.send(updatedBook);
})

//Delete book based on ID

router.delete('/:bookId', async (req,res) => {
  const book = await Book.findByIdAndRemove(req.params.bookId);
  if(!book) res.status(404).send("Book with id not found");
  res.send(book);
})

module.exports = router;

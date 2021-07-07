const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  age:{
    type:Number
  }
})

module.exports = new mongoose.model('Author', AuthorSchema);

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const booksRoute = require('./routes/books');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/books', booksRoute);

//connect to monogodb
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Connected to mongodb atlas")
}).catch(error => {
  console.log("Something is gone wrong");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
  console.log("Server started at PORT ", PORT)
})

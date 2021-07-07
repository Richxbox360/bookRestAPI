const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const booksRoute = require('./routes/books');
const winston = require('winston');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//create a logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({all:true})
      )
    }),
    new winston.transports.File({filename: 'error.log', level:'error'})
  ]
})

//routes
app.use('/api/books', booksRoute);

//connect to monogodb
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  //console.log("Connected to mongodb atlas")
  logger.log("info","connected to mongodb")
}).catch(error => {
  //console.log("Something is gone wrong");
  logger.log("error", error.message);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
  console.log("Server started at PORT ", PORT)
})

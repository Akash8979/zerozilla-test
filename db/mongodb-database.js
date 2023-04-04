const mongoose = require('mongoose')
const assert = require('assert')
const db_url= process.env.DB_URL

// const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://akashkumar140796:amit2901@cluster0.bo3i259.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('Connected!'));

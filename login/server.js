const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const userRouter = require("./routes/userRouter")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter)
app.get('/', (req, res) => {

  res.send('hello from simple server :)')

})


app.listen(port, () => console.log('> Server is up and running on port : ' + port))

// required libs : mongoose | colors
// run the following command
// npm i mongoose colors

const colors = require('colors');
const mongoose = require('mongoose')
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('> Connected...'.bgCyan))
  .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red))

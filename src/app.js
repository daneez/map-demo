const express = require('express')
const router = require('./routes/router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
// dependency injection, inject app into router
app.use(router); // make the module of router as a middleware, 

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
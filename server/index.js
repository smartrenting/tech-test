require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dbConfig = require('./config/db.config');
const loginRouter = require('./routes/login');
const orderRouter = require('./routes/order');

const port = 4242;
const app = express();
const url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.use(loginRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

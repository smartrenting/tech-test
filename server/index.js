require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const loginRouter = require('./routes/login');
const orderRouter = require('./routes/order');
const { url } = require('./config/db.config');

const port = process.env.LOCAL_PORT || 4242;
const app = express();

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

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const loginRouter = require('./routes/login');
const orderRouter = require('./routes/order');
const { url } = require('./config/db.config');

const OrderModel = require('./models/order.model');

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
  OrderModel.find({}, (err, data) => {
    if (err) res.send(err);
    else if (!data.length) {
      const orders = [
        {
          username: 'John',
          quantity: 2,
          date: new Date(),
        },
        {
          username: 'John',
          quantity: 1,
          date: new Date(),
        },
        {
          username: 'John',
          quantity: 3,
          date: new Date(),
        },
        {
          username: 'Doe',
          quantity: 1,
          date: new Date(),
        },
        {
          username: 'Doe',
          quantity: 1,
          date: new Date(),
        },
        {
          username: 'Doe',
          quantity: 3,
          date: new Date(),
        },
        {
          username: 'Ginette',
          quantity: 2,
          date: new Date(),
        },
        {
          username: 'Bob',
          quantity: 3,
          date: new Date(),
        },
        {
          username: 'Ginette',
          quantity: 6,
          date: new Date(),
        },
        {
          username: 'Bob',
          quantity: 10,
          date: new Date(),
        },
      ];
      OrderModel.create(orders, () => {
        if (err) res.send(err);
        else res.send('hello');
      });
    } else res.send('hello');
  });
});

app.use(loginRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const dbConfig = require('./config/db.config');
require('dotenv').config();

const port = 4242;
const app = express();
const url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const UserModel = require('./models/user.model');
const OrderModel = require('./models/order.model');

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

app.post('/login', async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (user) {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN);
        res.json({ jwt: token, user });
      } else { res.status(400).send('Wrong password'); }
    } catch (error) {
      res.status(500).send('Error with JWT');
    }
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = UserModel();
      newUser.username = req.body.username;
      newUser.password = hashedPassword;

      newUser.save((err, data) => {
        if (err) {
          res.status(400).send('Error during user creation');
        } else {
          const token = jwt.sign(newUser.toJSON(), process.env.SECRET_TOKEN);
          res.status(201).json({ user: data, jwt: token });
        }
      });
    } catch {
      res.status(500).send();
    }
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (token === null) res.status(401).send();

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).send();
    }
    req.user = user;
    return next();
  });
}

app.get('/orders', authenticateToken, (req, res) => {
  OrderModel.find((err, data) => {
    if (err) {
      return res.status(500).send('Error');
    }
    return res.status(200).send(data);
  });
});

app.post('/orders/add', authenticateToken, (req, res) => {
  const newOrder = new OrderModel();
  const newDate = dayjs();

  newOrder.id = req.body.id;
  newOrder.quantity = req.body.quantity;
  newOrder.date = newDate;

  newOrder.save((err, data) => {
    if (err) {
      res.status(400).send('Error during user creation');
    } else {
      res.status(201).send(data);
    }
  });
});

app.delete('/orders/delete', (req, res) => {
  OrderModel.deleteMany({}, {}, (err) => {
    if (err) {
      res.status(400).send('Error during delete');
    } else {
      res.status(204).send();
    }
  });
});

app.get('/users', (req, res) => {
  UserModel.find((err, data) => {
    if (err) {
      return res.status(500).send('Error');
    }
    return res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
